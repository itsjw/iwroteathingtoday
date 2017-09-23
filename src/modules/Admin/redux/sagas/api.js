/**
 * External dependencies
 */
import { select } from 'adnoto'
import Slug from 'slug'
import moment from 'moment'
import get from 'lodash/fp/get'
import findIndex from 'lodash/findIndex'

const getAdmin = get('admin')

const deferred = () => {
  let reject
  let resolve

  const promise = new Promise(function () {
    resolve = arguments[0]
    reject = arguments[1]
  })

  return { promise, reject, resolve }
}

const getSlug = (original) => ({ slug }) => slug === original

function getS3Bucket ({ accessKeyId, secretAccessKey, region, bucket }) {
  if (!window.AWS) throw Error('AWS global object not loaded.')

  const AWS = window.AWS

  AWS.config.region = region
  AWS.config.credentials = { accessKeyId, secretAccessKey }

  const params = { Bucket: bucket }

  return new AWS.S3({ params })
}

function createSlug ({ title, posts, index = 0 }) {
  const newSlug = Slug(`${title} ${index || ''}`.trim()).toLowerCase()

  if (findIndex(posts, ({ slug }) => slug === newSlug) !== -1) {
    return createSlug({ title, posts, index: ++index })
  }

  return newSlug
}

export function deletePost ({ data: { slug, secretAccessKey } }) {
  const { promise, reject, resolve } = deferred()
  const { posts, auth: { accessKeyId, region, bucket } } = select(getAdmin)

  const s3 = getS3Bucket({ accessKeyId, region, bucket, secretAccessKey })

  posts.splice(findIndex(posts, getSlug(slug)), 1)

  const params = { Bucket: bucket, Key: 'posts.json', Body: new Buffer(JSON.stringify(posts)) }

  s3.putObject(params, (err, data) => {
    if (err) return reject(err)
    resolve(posts)
  })

  return promise
}

export function savePost ({ data: { secretAccessKey, slug, title, content } }) {
  const { promise, reject, resolve } = deferred()
  const { posts, auth: { accessKeyId, region, bucket } } = select(getAdmin)

  if (slug) {
    const index = findIndex(posts, getSlug(slug))

    if (index === -1) {
      return reject(Error('Cannot find post to update.'))
    }

    posts[index] = {
      ...posts[index],
      title,
      content
    }
  } else {
    posts.splice(0, 0, {
      slug: createSlug({ title, posts }),
      added: moment().toISOString(),
      title,
      content
    })
  }

  const s3 = getS3Bucket({ accessKeyId, region, bucket, secretAccessKey })

  const params = { Bucket: bucket, Key: 'posts.json', Body: new Buffer(JSON.stringify(posts)) }
  s3.putObject(params, (err, data) => {
    if (err) return reject(err)
    resolve(posts)
  })

  return promise
}

export function getSettings ({ data: { accessKeyId, secretAccessKey, region, bucket } }) {
  const { promise, reject, resolve } = deferred()

  // The name of the posts file
  const params = { Bucket: bucket, Key: 'posts.json' }

  // Get the S3 object
  const s3 = getS3Bucket({ accessKeyId, secretAccessKey, region, bucket })

  s3.getObject(params, (err, data) => {
    if (err) return reject(err)
    resolve(JSON.parse(data.Body.toString()))
  })

  return promise
}

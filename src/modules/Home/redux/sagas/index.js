/**
 * External dependencies
 */
import { dispatch } from 'adnoto'

/**
 * Internal dependencies
 */
import { GET_POSTS } from '../action_types'
import { getPosts } from './api'

function fetchResult (action) {
  getPosts(action)
    .then(payload => {
      dispatch({ type: GET_POSTS.SUCCESS, payload })
    })
    .catch(e => {
      dispatch({ type: GET_POSTS.FAILED, message: e.message || e })
    })
}

/**
 * Export the root saga by forking all available sagas.
 */
export default [
  action => { (action.type === GET_POSTS.ACTION) && fetchResult(action) }
]

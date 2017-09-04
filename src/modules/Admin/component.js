/**
 * External dependencies
 */
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Row from 'antd/lib/grid/row'
import Col from 'antd/lib/grid/col'
import notification from 'antd/lib/notification'
import findIndex from 'lodash/findIndex'

/**
 * Internal dependencies
 */
import Login from './components/Login'
import Posts from './components/Posts'
import Edit from './components/Edit'

const newPost = { title: '', content: '' }

class Admin extends Component {
  constructor () {
    super()

    this.state = { loginDisabled: false, editing: null }

    this.editPost = this.editPost.bind(this)
    this.onStopEdit = this.onStopEdit.bind(this)
  }

  componentDidUpdate (props) {
    const { admin: { error } } = this.props

    if (error) {
      setTimeout(this.props.readError, 4500)

      notification.error({
        message: error,
        description: 'Cannot retrieve posts, check the bucket name and region.'
      })
    }
  }

  onStopEdit () {
    this.setState({ editing: null })
  }

  editPost (editSlug) {
    if (!editSlug) {
      return this.setState({ editing: Symbol('non-exiting') })
    }

    this.setState({ editing: findIndex(this.props.admin.posts, ({ slug }) => slug === editSlug) })
  }

  render () {
    const { admin: { posts } } = this.props
    const { editing } = this.state

    return (
      <div className='mod-admin'>
        <Helmet>
          <title> Joseph Callaars - Super Secret Admin Panel </title>
          <script src='https://sdk.amazonaws.com/js/aws-sdk-2.1.12.min.js' />
        </Helmet>

        <Row justify='center'>
          <h1> Super secret admin panel, it's ridiculously secret. </h1>
          <h2> Like, I can't even start on how safe and secret this is. </h2>

          <Col sm={{ offset: 1, span: 22 }} md={{ offset: 6, span: 12 }}>
            {!posts && (<Login {...this.props} />)}
            {editing === null && posts && (<Posts posts={posts} editPost={this.editPost} />)}
            {editing !== null && posts && (
              <Edit onStopEdit={this.onStopEdit} post={posts[editing] || newPost} {...this.props} />
            )}
          </Col>

        </Row>
      </div>
    )
  }
}

export default Admin

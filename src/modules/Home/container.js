/**
 * External dependencies
 */
import React from 'react'
import { select, subscribe } from 'adnoto'
import get from 'lodash/fp/get'

/**
 * Internal dependencies
 */
import Component from './component'
import * as actions from './redux/actions'

class Container extends React.Component {
  componentWillMount () {
    subscribe(({ posts }) => {
      this.setState({ posts })
    })

    this.state = { posts: select(get('posts')) }
  }

  render () {
    return (<Component posts={this.state.posts} {...actions} />)
  }
}

export default Container

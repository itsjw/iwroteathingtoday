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
    subscribe(({ admin }) => {
      this.setState({ admin })
    })

    this.state = { admin: select(get('admin')) }
  }

  render () {
    return (<Component admin={this.state.admin} {...actions} />)
  }
}

export default Container

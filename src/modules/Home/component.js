/**
 * External dependencies
 */
import React from 'react'
import styled from 'styled-components'
import map from 'lodash/map'
import Row from 'antd/lib/row'

/**
 * Internal dependencies
 */
import Post from './components/Post'
import ms from '../../shared/styles/modular-scale'
import config from '../../shared/config'

const HomeDiv = styled.div`
  padding: ${ms(0)} ${ms(1)};
`

const subtitle = config.subtitle ? (<h2> {config.subtitle} </h2>) : null

class Home extends React.Component {
  componentWillMount () {
    if (!this.props.posts) {
      this.props.getPosts()
    }
  }

  render () {
    const { posts = [] } = this.props

    return (
      <HomeDiv>
        <h1> {config.title} </h1>
        {subtitle}

        <Row ref='posts' justify='center'> {map(posts, post => (<Post key={post.slug} post={post} />))} </Row>
      </HomeDiv>
    )
  }
}

export default Home

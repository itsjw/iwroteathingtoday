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

const HomeDiv = styled.div`
  padding: ${ms(0)} ${ms(1)};
`

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
        <h1> I'm Joseph Callaars, and these are my ramblings. </h1>

        <Row ref='posts' justify='center'> {map(posts, post => (<Post key={post.slug} post={post} />))} </Row>
      </HomeDiv>
    )
  }
}

export default Home

/**
 * External dependencies
 */
import React from 'react'
import moment from 'moment'
import Col from 'antd/lib/col'
import ReactEmoji from 'react-emoji'

/**
 * Internal dependencies
 */
import PostDiv from '../../../../shared/styled/Post'

const Post = ({ post: { content, added } }) => (
  <Col md={{ span: 12, offset: 6 }}>
    <PostDiv>
      <hr />

      <p> {ReactEmoji.emojify(content)} </p>

      <hr />
      <span> Rambled on <time> {moment(added).format('lll')} </time> </span>
    </PostDiv>
  </Col>
)

export default Post

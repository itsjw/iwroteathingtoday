/**
 * External dependencies
 */
import React from 'react'
import moment from 'moment'
import Col from 'antd/lib/col'

/**
 * Internal dependencies
 */
import PostDiv from '../../../../shared/styled/Post'
import stylize from '../../../../shared/stylize-text'

const Post = ({ post: { content, added } }) => (
  <Col md={{ span: 12, offset: 6 }}>
    <PostDiv>
      <hr />

      {stylize(content)}

      <hr />
      <span> Rambled on <time> {moment(added).format('lll')} </time> </span>
    </PostDiv>
  </Col>
)

export default Post

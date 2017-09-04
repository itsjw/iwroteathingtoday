/**
 * External dependencies
 */
import React from 'react'
import styled from 'styled-components'
import Table, { Column } from 'antd/lib/table'
import moment from 'moment'
import Button from 'antd/lib/button'
import ms from '../../../../shared/styles/modular-scale'

const Link = styled.a`
  cursor: pointer;
`

const PostsDiv = styled.div`
  margin: ${ms(2)} 0;

  .buttons {
    margin-top: 1em;
  }
`

const onClickEdit = (editPost, slug) => () => editPost(slug)
const onClickNew = editPost => () => editPost()

const renderActions = editPost => (_, { slug }) => (
  <Link onClick={onClickEdit(editPost, slug)}> Edit </Link>
)

const formatDate = t => moment(t).format('lll')

const Posts = ({ posts, editPost }) => (
  <PostsDiv>
    <h3> Current posts </h3>

    <Table dataSource={posts} rowKey='slug' pagination={false} >
      <Column title='Title' dataIndex='title' key='title' />
      <Column title='Added' dataIndex='added' key='added' render={formatDate} />
      <Column
        title='Action'
        key='action'
        render={renderActions(editPost)}
      />
    </Table>

    <div className='buttons'>
      <Button type='primary' onClick={onClickNew(editPost)}> New post </Button>
    </div>
  </PostsDiv>
)

export default Posts

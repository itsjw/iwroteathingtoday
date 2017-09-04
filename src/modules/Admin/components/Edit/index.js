/**
 * External dependencies
 */
import React, { PureComponent } from 'react'
import Form, { Item } from 'antd/lib/form'
import Input, { TextArea } from 'antd/lib/input'
import Button from 'antd/lib/button'
import Row from 'antd/lib/grid/row'
import Col from 'antd/lib/grid/col'
import styled from 'styled-components'
import ReactEmoji from 'react-emoji'

/**
 * Internal dependencies
 */
import stylize from '../../../../shared/stylize-text'
import PostDiv from '../../../../shared/styled/Post'

const ButtonStyle = styled.div`
  > button:last-child {
    margin-left: 1em;
  }
`

const Preview = styled.div`
  height: 100px;
`

const EditDiv = styled.div`
  margin: 2em 0;
`

class Edit extends PureComponent {
  componentWillMount () {
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeContent = this.changeContent.bind(this)
    this.deletePost = this.deletePost.bind(this)

    this.state = { post: this.props.post, loading: false }
  }

  deletePost () {
    this.props.form.validateFields((err, { secretAccessKey }) => {
      if (!err) {
        this.setState({ loading: true })
        this.props.deletePost({ slug: this.props.post.slug, secretAccessKey })
      }
    })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true })
        this.props.savePost({ ...values, slug: this.props.post.slug })
      }
    })
  }

  changeContent (name) {
    return ({ target: { value } }) => {
      this.setState({ post: { ...this.state.post, [name]: value } })
    }
  }

  shouldComponentUpdate (newProps, newState) {
    if (newProps !== this.props) {
      this.setState({ loading: false, post: newProps.post })
      return true
    }

    if (newState !== this.state) {
      return true
    }

    return false
  }

  render () {
    const { form: { getFieldDecorator } } = this.props
    const { title, content } = this.state.post

    return (
      <EditDiv>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={23} offset={1}>
              <Item>
                {getFieldDecorator('title', {
                  initialValue: title,
                  rules: [{ required: true, message: 'Simple title for your identification' }]
                })(
                  <Input />
                )}
              </Item>
            </Col>

            <Col span={11} offset={1}>
              <Item>
                {getFieldDecorator('content', {
                  initialValue: content
                })(
                  <TextArea onChange={this.changeContent('content')} rows={10} />
                )}
              </Item>

              <Item label='AWS secret access key'>
                {getFieldDecorator('secretAccessKey', {
                  rules: [{ required: true, message: 'The AWS secret access key' }]
                })(
                  <Input type='password' />
                )}
              </Item>
            </Col>

            <Col span={11} offset={1}>
              <Preview>
                <PostDiv>
                  <p> {ReactEmoji.emojify(stylize(content))} </p>
                </PostDiv>
              </Preview>

            </Col>

            <Col span={23} offset={1}>
              <ButtonStyle>
                <Button.Group>
                  <Button type='primary' htmlType='submit'> Save </Button>
                  <Button type='danger' onClick={this.deletePost}> Delete </Button>
                  <Button onClick={this.props.onStopEdit}> Back </Button>
                </Button.Group>
              </ButtonStyle>
            </Col>
          </Row>
        </Form>
      </EditDiv>
    )
  }
}

export default Form.create()(Edit)

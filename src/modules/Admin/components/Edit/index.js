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
import transform from 'lodash/transform'
import map from 'lodash/fp/map'
import fullList from 'markdown-it-emoji/lib/data/full.json'
import AutoComplete, { Option } from 'antd/lib/auto-complete'
import twemoji from 'twemoji'

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

const OptionText = styled.span`
  img {
    height: 18px;
  }
`

const emojis = transform(fullList, (result, text, value) => {
  result.push({ value, text })
}, []).sort(({ value: a }, { value: b }) => a.length < b.length ? -1 : a.length > b.length ? 1 : 0)

const renderOptions = map(({ text, value }) => (
  <Option key={value}> <OptionText dangerouslySetInnerHTML={{ __html: twemoji.parse(text) }} /> </Option>
))

class Edit extends PureComponent {
  componentWillMount () {
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeContent = this.changeContent.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.onEmojiSearch = this.onEmojiSearch.bind(this)
    this.onEmojiSelect = this.onEmojiSelect.bind(this)

    this.state = { post: this.props.post, loading: false, emojiList: renderOptions(emojis.slice(0, 10)) }
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

  onEmojiSelect (value) {
    const content = this.props.form.getFieldValue('content') + ` :${value}:`

    this.setState({ post: { ...this.state.post, content } })
    this.props.form.setFieldsValue({ content })
  }

  onEmojiSearch (value) {
    const search = RegExp(value, 'i')

    this.setState({
      ...this.state,
      emojiList: renderOptions(emojis.reduce((result, emoji) => {
        if (result.length < 20 && search.test(emoji.value)) result.push(emoji)
        return result
      }, []))
    })
  }

  render () {
    const { form: { getFieldDecorator } } = this.props
    const { post: { title, content }, emojiList } = this.state

    return (
      <EditDiv>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={23} offset={1}>
              <Item label='Title'>
                {getFieldDecorator('title', {
                  initialValue: title,
                  rules: [{ required: true, message: 'Simple title for your identification' }]
                })(
                  <Input />
                )}
              </Item>
            </Col>

            <Col span={11} offset={1}>
              <Item label='Content'>
                {getFieldDecorator('content', {
                  initialValue: content,
                  rules: [{ required: true, message: 'Add the content of your nano blog here!' }]
                })(
                  <TextArea onChange={this.changeContent('content')} rows={10} />
                )}

              </Item>

              <Item>
                <AutoComplete placeholder='Emoji Search' onSelect={this.onEmojiSelect} onSearch={this.onEmojiSearch}>
                  {emojiList}
                </AutoComplete>
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
              <Preview> {stylize(content, PostDiv)} </Preview>
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

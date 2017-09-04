/**
 * External dependencies
 */
import React, { Component } from 'react'
import Button from 'antd/lib/button'
import Form, { Item } from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select, { Option } from 'antd/lib/select'

class Login extends Component {
  constructor () {
    super()

    this.state = { loginDisabled: false }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    this.setState({ loginDisabled: true })

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setAuth(Object.assign({}, values, { secretAccessKey: undefined }))
        this.props.getPosts(values)
      }
    })
  }

  render () {
    const { form: { getFieldDecorator } } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <Item label='AWS region'>
          {getFieldDecorator('region', {
            initialValue: 'us-east-1',
            rules: [{ required: true, message: 'Your AWS region' }]
          })(
            <Select>
              <Option value='us-east-1'> US East (N. Virginia) </Option>
              <Option value='us-east-2'> US East (Ohio) </Option>
              <Option value='us-west-1'> US West (N. California) </Option>
              <Option value='us-west-2'> US West (Oregon) </Option>
              <Option value='ca-central-1'> Canada (Central) </Option>
              <Option value='ap-south-1'> Asia Pacific (Mumbai) </Option>
              <Option value='ap-northeast-2'> Asia Pacific (Seoul) </Option>
              <Option value='ap-southeast-1'> Asia Pacific (Singapore) </Option>
              <Option value='ap-southeast-2'> Asia Pacific (Sydney) </Option>
              <Option value='ap-northeast-1'> Asia Pacific (Tokyo) </Option>
              <Option value='eu-central-1'> EU (Frankfurt) </Option>
              <Option value='eu-west-1'> EU (Ireland) </Option>
              <Option value='eu-west-2'> EU (London) </Option>
              <Option value='sa-east-1'> South America (São Paulo) </Option>
            </Select>
          )}
        </Item>

        <Item label='AWS S3 bucket name'>
          {getFieldDecorator('bucket', {
            initialValue: 'aws-website-callaars-pdske',
            rules: [{ required: true, message: 'Your AWS S3 bucket name' }]
          })(
            <Input />
          )}
        </Item>

        <Item label='AWS access key id'>
          {getFieldDecorator('accessKeyId', {
            initialValue: 'AKIAJ7ZAZKABH6VCZ57A',
            rules: [{ required: true, message: 'Your AWS access key id' }]
          })(
            <Input />
          )}
        </Item>

        <Item label='AWS secret access key'>
          {getFieldDecorator('secretAccessKey', {
            initialValue: 'ocS7U03fFaGeFXjbOhD3HisSKHJhTFFKAcnGNRJj',
            rules: [{ required: true, message: 'Your AWS secret access key' }]
          })(
            <Input type='password' />
          )}
        </Item>

        <Button loading={this.state.loginDisabled} type='primary' htmlType='submit'> Login </Button>
      </Form>
    )
  }
}

export default Form.create()(Login)

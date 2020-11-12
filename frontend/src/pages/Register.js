import React, { useReducer } from 'react'
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import URLs from '../utils/valid_url.js'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
    flex: 'auto'
  }
}

function Register() {
  const [toLogin, setToLogin] = useState(false)
  const [error, setError] = useState(false)

  async function onFinish(values) {
    try {
      const { name, email, password } = values
      const response = await axios.post(URLs.register, { name, email, password })
      setToLogin(true)
    } catch (err) {
      console.log('Error when trying to Register', err)
      setError(true)
    }
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo)
    setError(true)
  }

  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        style={{ position: 'relative' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {toLogin ? <Redirect to="/login" /> : ''}
      {error ? <p style={{ color: 'red' }}> Register Failed. Please try again. </p> : ''}
    </>
  )
}

export default Register

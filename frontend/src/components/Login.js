import React from 'react'
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useUser } from '../userContext'
import {} from 'dotenv/config.js'

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

function Login() {
  const { login, isAuthenticated } = useUser()
  const [toDashboard, setToDashboard] = useState(false)
  const [error, setError] = useState(false)

  async function onFinish(values) {
    try {
      const { email, password } = values

      const URL = 'http://192.168.100.15:4000/api/auth'
      const response = await axios.post(URL, { email, password })

      const user = {
        email: email,
        token: response.headers['x-auth-token'],
        remember: values.remember
      }

      login(user)
      console.log('isAuth: ', isAuthenticated)
      setToDashboard(true)
    } catch (err) {
      console.log('Error when trying to Login', err)
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
      {toDashboard ? <Redirect to="/dashboard" /> : null}
      {error ? <p style={{ color: 'red' }}> Login Failed. Please try again. </p> : ''}
    </>
  )
}

export default Login

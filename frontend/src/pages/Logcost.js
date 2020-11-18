import React, { useState } from 'react'
import { Card, Col, InputNumber, Radio, Button, Mentions } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { useUser } from '../utils/userContext.js'
import { success, failure, warning } from '../utils/popup_messages.js'
import { Redirect } from 'react-router-dom'

const { Option } = Mentions

const tags = ['carrefour', 'mega', 'EGROS', 'EON', 'RDS', 'rent', 'insurance', 'gas', 'vacantion']
let listInputTags = []

const containerRadio = {
  display: 'inline-block',
  verticalAlign: 'top'
}

function Logcost(props) {
  const [radioVal, setRadioVal] = useState('')
  const [cost, setCost] = useState(0)
  const { user } = useUser()
  const [inputTags, setInputTags] = useState([])
  const [description, setDescription] = useState()
  const [text, setText] = useState('')

  const labels = ['food', 'house-bills', 'car-diesel', 'medicines', 'clothes', 'others']

  function onSelect(e) {
    setRadioVal(e.target.value)
    console.log(radioVal)
  }
  function init_states() {
    setRadioVal('')
    setCost(0)
    setInputTags([])
    setDescription()
    setText('')
    listInputTags = []
  }

  function onChange(value) {
    setCost(value)
  }

  function onChangeDescription(value) {
    console.log('text:', value)

    value = value.trim()

    //replace new line
    value = value.replace(/\r?\n|\r/g, ' ')

    //replave empty spaces
    value = value.replace(/\s\s+/g, ' ')

    const words = value.split(' ')

    var regex = RegExp('^[a-zA-Z0-9]+')
    console.log(words)

    //filter description wihtout tags
    value = words.filter((word) => regex.test(word))
    value = value.join(' ')

    //set description
    setDescription(value)
  }
  function onSelectTags(option) {
    listInputTags.push(option.value)
    setInputTags(listInputTags)
  }

  async function onLog(e) {
    e.preventDefault()

    onChangeDescription(text)

    const message = { label: radioVal, cost: cost, userID: user._id, tags: inputTags, description: description }
    if (radioVal && cost > 0) {
      try {
        await axios.post(URLs.logCost, message, {
          headers: {
            'x-auth-token': `${user.token}`
          }
        })

        success()
        init_states()
      } catch (err) {
        failure(err.message)
      }
    } else warning()
  }

  return (
    <>
      {/* {console.log('inputTags', inputTags)}
      {console.log('radioVal', radioVal)} */}
      <div className="site-card-wrapper">
        <Col span={26}>
          <Card>
            <Col span={26}>
              <p className="titleStyle">On what did you spend money this time?</p>
            </Col>
            <br />

            <Col span={26}>
              <div style={{ display: 'block', color: 'grey' }}>
                <p style={{ display: 'inline-block', marginRight: '5px', color: 'grey' }}>RON: </p>
                <InputNumber
                  formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={onChange}
                  size="large"
                  style={{ color: 'grey', borderColor: 'transparent', display: 'inline-block' }}
                  value={cost}
                />
              </div>
            </Col>

            <br />

            <Col span={26}>
              <div style={containerRadio}>
                <Radio.Group onChange={onSelect} value={radioVal} size="large">
                  {labels.map((label, index) => {
                    return (
                      <Radio className="radioStyle" value={label} key={index}>
                        {' '}
                        {label}
                      </Radio>
                    )
                  })}
                </Radio.Group>
              </div>
            </Col>

            <br />

            <Mentions
              style={{ textAlign: 'center', color: 'grey', borderColor: 'transparent' }}
              onChange={(value) => setText(value)}
              onSelect={onSelectTags}
              placeholder="input # to mention tag"
              prefix={'#'}
              className="itemList"
              value={text}
            >
              {tags.map((value) => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </Mentions>

            <br />
            <br />

            <Button type="primary" shape="round" size="large" onClick={onLog}>
              Click to log cost
            </Button>
          </Card>
        </Col>
      </div>
    </>
  )
}

export default Logcost

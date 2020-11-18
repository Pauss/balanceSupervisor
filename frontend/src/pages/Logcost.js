import React, { useState } from 'react'
import { Card, Col, InputNumber, Radio, Button } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { useUser } from '../utils/userContext.js'
import logCostImage from '../images/logCost.jpg'
import { success, failure, warning } from '../utils/popup_messages.js'
import { Redirect } from 'react-router-dom'
import OptionTags from '../components/OptionTags'

const containerRadio = {
  display: 'inline-block',
  verticalAlign: 'top'
}

function Logcost(props) {
  const [radioVal, setRadioVal] = useState('')
  const [cost, setCost] = useState(0)
  const { user } = useUser()
  const [refresh, setRefresh] = useState(false)

  const labels = ['food', 'house-bills', 'car-diesel', 'medicines', 'clothes', 'others']

  function onSelect(e) {
    setRadioVal(e.target.value)
    console.log(radioVal)
  }

  function onChange(value) {
    setCost(value)
  }

  async function onLog(e) {
    e.preventDefault()

    const message = { label: radioVal, cost: cost, userID: user._id }
    if (radioVal && cost > 0) {
      try {
        await axios.post(URLs.logCost, message, {
          headers: {
            'x-auth-token': `${user.token}`
          }
        })

        success()
        setRefresh(true)
      } catch (err) {
        failure(err.message)
        setRefresh(true)
      }
    } else warning()
  }

  return (
    <>
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

            <OptionTags />

            <br />
            <br />

            <Button type="primary" shape="round" size="large" onClick={onLog}>
              Click to log cost
            </Button>
          </Card>
        </Col>
      </div>
      {refresh ? <Redirect to="/logcost" /> : null}
    </>
  )
}

export default Logcost

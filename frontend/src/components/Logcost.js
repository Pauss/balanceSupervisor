import React, { useState } from 'react'
import { Card, Col, InputNumber, Radio, Space } from 'antd'

function Logcost() {
  const [radioVal, setRadioVal] = useState('')
  const [cost, setCost] = useState(0)

  const labels = ['food', 'house-bills', 'car-diesel', 'medicines', 'clothes', 'others']

  function onSelect(e) {
    setRadioVal(e.target.value)
    console.log(radioVal)
  }

  function onChange(value) {
    setCost(value)
  }
  return (
    <>
      <div className="site-card-wrapper">
        <Col span={32}>
          <Card title="Tell me...on what you spend money this time?" bordered={false}>
            <Col span={32}>
              <InputNumber
                defaultValue={0}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={onChange}
                size="large"
              />
            </Col>

            <br />
            <br />
            <Col span={32}>
              <Radio.Group onChange={onSelect} value={radioVal}>
                {labels.map((label) => {
                  return <Radio value={label}> {label}</Radio>
                })}
              </Radio.Group>
            </Col>
          </Card>
        </Col>
      </div>
      ,
    </>
  )
}

export default Logcost

import React, { useState, useEffect } from 'react'
import { List, Avatar, Divider, Col, Card } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { failure } from '../utils/popup_messages.js'
import { useUser } from '../utils/userContext.js'
import label_codes from '../utils/label_codes.js'

function Dashboard() {
  const [totalCost, setTotalCost] = useState([])
  const { user } = useUser()

  useEffect(() => {
    getDashboard()
  }, [])

  async function getDashboard() {
    try {
      const response = await axios.get(URLs.getDashboard, {
        headers: {
          'x-auth-token': `${user.token}`
        }
      })

      setTotalCost(response.data)

      console.log('totalCost', totalCost)
    } catch (err) {
      failure(err.message)
    }
  }

  return (
    <>
      <div className="site-card-wrapper">
        <Col>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={label_codes}
              size="large"
              renderItem={(item, index) => (
                <div className="itemList">
                  {index ? <Divider /> : null}
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ fontSize: '3em' }}
                          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                          className="iconItems"
                        >
                          {String.fromCodePoint(item.code)}
                        </Avatar>
                      }
                      title={<p style={{ fontSize: 'large' }}>{item.title}</p>}
                      //title={<br />}
                      description={<p style={{ fontSize: 'large' }}>{totalCost[index]} RON</p>}
                    />
                  </List.Item>
                </div>
              )}
            />
          </Card>
        </Col>
      </div>
    </>
  )
}

export default Dashboard

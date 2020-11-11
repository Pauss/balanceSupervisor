import React, { useState, useEffect } from 'react'
import { List, Divider, Col, Card } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { failure } from '../utils/popup_messages.js'
import { useUser } from '../utils/userContext.js'
import labels_codes from '../utils/label_codes.js'

function LogsHistory() {
  const [history, setHistory] = useState([])
  const { user } = useUser()

  useEffect(() => {
    getDashboard()
  }, [])

  async function getDashboard() {
    try {
      const response = await axios.get(URLs.history, {
        headers: {
          'x-auth-token': `${user.token}`
        }
      })

      setHistory(response.data)
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
              dataSource={history}
              size="small"
              renderItem={(item, index) => (
                <div className="itemList-history">
                  {index ? <Divider /> : null}

                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          <div style={{ display: 'inline', fontSize: 'large' }}>
                            {item.created} {item.label}
                          </div>
                          <div style={{ display: 'inline', fontSize: 'medium' }}> {item.cost} RON</div>
                        </>
                      }
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

export default LogsHistory

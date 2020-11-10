import React from 'react'
import { List, Avatar, Divider, Col, Card } from 'antd'
import '../App.css'

const data = [
  {
    title: 'Food',
    code: '127829'
  },
  {
    title: 'House-bills',
    code: '127968'
  },
  {
    title: 'Car-diesel',
    code: '128663'
  },
  {
    title: 'Medicines',
    code: '129298'
  },
  {
    title: 'Clothes',
    code: '128085'
  },
  {
    title: 'Others',
    code: '129300'
  }
]

function Dashboard() {
  return (
    <>
      <div className="site-card-wrapper">
        <Col>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={data}
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
                      description={<p style={{ fontSize: 'large' }}>124 RON</p>}
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

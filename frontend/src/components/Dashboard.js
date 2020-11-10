import React from 'react'
import { List, Avatar } from 'antd'
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
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar style={{ fontSize: '3em' }} size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} className="iconItems">
                  {String.fromCodePoint(item.code)}
                </Avatar>
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default Dashboard

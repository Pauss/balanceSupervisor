import React, { useState, useEffect } from 'react'
import { List, Avatar, Divider, Col, Card } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { failure } from '../utils/popup_messages.js'
import { useUser } from '../utils/userContext.js'
import { setTotal, mapSymbols_obj } from '../utils/obj_manipulation.js'
import DropDown from '../components/DropDown'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState([])
  const { user } = useUser()

  useEffect(() => {
    ;(async function anyNameFunction() {
      const res = await getDashboard()

      console.log('res: ', res)

      //prepare data
      setTotal(res)
      mapSymbols_obj(res)

      console.log('res after: ', res)

      //save data
      setDashboardData(res)
    })()
  }, [])

  async function getDashboard() {
    try {
      const response = await axios.get(URLs.getDashboard, {
        headers: {
          'x-auth-token': `${user.token}`
        }
      })
      return response.data
    } catch (err) {
      failure(err.message)
    }
  }

  function getFinalCost() {
    let total = 0

    dashboardData.forEach((log) => {
      total += log.totalCost
    })

    return total
  }

  return (
    <>
      <></>
      <div className="site-card-wrapper">
        <Col>
          <Card>
            <p className="titleStyle"> Spendings of this month until today: {getFinalCost()}RON</p>
            <List
              itemLayout="horizontal"
              dataSource={dashboardData}
              size="large"
              renderItem={(item, index) => {
                if (item.totalCost > 0)
                  return (
                    <div className="itemList">
                      <Divider style={{ margin: '8px' }} />
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
                          title={<DropDown itemList={item} />}
                          description={<p style={{ fontSize: 'large' }}>{item.totalCost} RON</p>}
                          key={item.label}
                        />
                      </List.Item>
                    </div>
                  )
              }}
            />
          </Card>
        </Col>
      </div>
    </>
  )
}

export default Dashboard

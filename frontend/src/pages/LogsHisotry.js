import React, { useState, useEffect } from 'react'
import { List, Divider, Col, Card, Pagination, Button, Popconfirm } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { failure, success } from '../utils/popup_messages.js'
import { useUser } from '../utils/userContext.js'
import Description from '../components/Description'
import { mapSymbols_array } from '../utils/obj_manipulation.js'

function LogsHistory() {
  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const { user } = useUser()
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    onChange(1)
  }, [])

  async function getHistory(skip) {
    try {
      const response = await axios.post(
        URLs.history,
        { skip },
        {
          headers: {
            'x-auth-token': `${user.token}`
          }
        }
      )

      return response.data
    } catch (err) {
      failure(err.message)
    }
  }

  async function onChange(page, pageSize) {
    setPage(page)
    const skip = page * 20 - 20
    try {
      const res = await getHistory(skip)
      if (res !== undefined && res.results !== undefined) {
        //prepare data
        mapSymbols_array(res.results)
        setTotalPages(res.count ? res.count : 1)

        //set data
        setHistory(res.results)
      }
    } catch (err) {
      failure(err)
    }
  }

  async function onDelete(id) {
    try {
      await axios.delete(
        URLs.deleteLog,

        {
          headers: {
            'x-auth-token': `${user.token}`
          },
          data: { id }
        }
      )
      success()
      onChange(page)
    } catch (err) {
      failure(err.message)
    }
  }

  return (
    <>
      <div></div>
      <div className="site-card-wrapper">
        <Col>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={history}
              size="small"
              renderItem={(item, index) => {
                if (item.label !== undefined) {
                  return (
                    <>
                      <div className="itemList-history">
                        {index ? <Divider style={{ margin: '8px' }} /> : null}

                        <List.Item>
                          <List.Item.Meta description={<Description item={item} code={item.code} />} />
                        </List.Item>
                      </div>
                      <div style={{ display: 'block' }}>
                        <Button size="small" style={{ display: 'inline-block' }} type="text">
                          {' '}
                          edit
                        </Button>
                        <p style={{ display: 'inline-block' }}>|</p>
                        <Popconfirm
                          onConfirm={() => onDelete(item._id)}
                          title="Are you sure delete this log？"
                          okText="Yes"
                          cancelText="No"
                          okButtonProps="small"
                        >
                          {' '}
                          delete
                        </Popconfirm>
                      </div>
                    </>
                  )
                }
              }}
            />
            <Pagination defaultPageSize="20" pageSize="20" onChange={onChange} defaultCurrent={page} total={totalPages * 20} />
          </Card>
        </Col>
      </div>
    </>
  )
}

export default LogsHistory

import React, { useState, useEffect } from 'react'
import { List, Divider, Col, Card, Pagination } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { failure } from '../utils/popup_messages.js'
import { useUser } from '../utils/userContext.js'
import labels_codes from '../utils/label_codes.js'

function LogsHistory() {
  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const { user } = useUser()
  const [totalPages, setTotalPages] = useState(2)

  useEffect(() => {
    console.log('totalPages before get', totalPages)
    ;(async function anyNameFunction() {
      const res = await getHistory(0)
      mapSymbols(res.results)
      setTotalPages(res.count)
      setHistory(res.results)
    })()
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
    console.log('totalPages before get', totalPages)
    setPage(page)
    const skip = page * 20 - 20
    const res = await getHistory(skip)

    mapSymbols(res.results)
    setTotalPages(res.count)
    console.log(res.results[0])
    setHistory(res.results)
  }

  function mapSymbols(array) {
    array.map((result) => {
      const element = labels_codes.find((obj) => obj.title.toLowerCase() === result.label)

      result.code = element.code
    })
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
              renderItem={(item, index) => (
                <div className="itemList-history">
                  {index ? <Divider /> : null}

                  <List.Item>
                    <List.Item.Meta
                      description={
                        <>
                          <div style={{ display: 'inline', fontSize: 'medium' }}>{new Date(item.created).toUTCString()}</div>
                          {/* <div style={{ display: 'inline', fontSize: 'medium', textTransform: 'capitalize' }}> {item.label}</div> */}
                          <span style={{ fontSize: '2em', color: 'rgba(0,0,0,0.8)' }}>{String.fromCodePoint(item.code)}</span>

                          <div
                            style={{
                              display: 'inline',
                              fontSize: 'large',
                              color: 'rgb(199, 21, 133)'
                            }}
                          >
                            {'   '}
                            {item.cost} RON
                          </div>
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
      <Pagination defaultPageSize="20" pageSize="20" onChange={onChange} defaultCurrent={page} total={totalPages * 20} />
    </>
  )
}

export default LogsHistory

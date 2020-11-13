import React, { useState, useEffect } from 'react'
import { List, Divider, Col, Card, Pagination } from 'antd'
import '../App.css'
import axios from 'axios'
import URLs from '../utils/valid_url.js'
import { failure } from '../utils/popup_messages.js'
import { useUser } from '../utils/userContext.js'
import labels_codes from '../utils/label_codes.js'
import Description from '../components/Description'
import { mapSymbols_array } from '../utils/obj_manipulation.js'

function LogsHistory() {
  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const { user } = useUser()
  const [totalPages, setTotalPages] = useState(2)

  useEffect(() => {
    console.log('totalPages before get', totalPages)
    ;(async function anyNameFunction() {
      try {
        const res = await getHistory(0)
        console.log('res', res)
        if (res !== undefined && res.results != undefined) {
          //prepare data
          mapSymbols_array(res.results)
          setTotalPages(res.count)

          //set data
          setHistory(res.results)
        }
      } catch (err) {
        failure(err)
      }
    })()
  }, [])

  async function getHistory(skip) {
    try {
      const response = await axios.post(
        URLs.history,
        { skip },
        {
          headers: {
            'x-auth-token': `${user.token}`,
          },
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
    try {
      const res = await getHistory(skip)
      console.log('res', res)
      if (res !== undefined && res.results != undefined) {
        //prepare data
        mapSymbols_array(res.results)
        setTotalPages(res.count)

        //set data
        setHistory(res.results)
      }
    } catch (err) {
      failure(err)
    }
  }

  return (
    <>
      <div></div>
      <div className="site-card-wrapper">
        <Col>
          <Card style={{ padding: '20px' }}>
            <List
              itemLayout="horizontal"
              dataSource={history}
              size="small"
              renderItem={(item, index) => {
                if (item.label !== undefined) {
                  return (
                    <div className="itemList-history">
                      {index ? <Divider style={{ margin: '8px' }} /> : null}

                      <List.Item>
                        <List.Item.Meta
                          description={<Description item={item} code={item.code} />}
                        />
                      </List.Item>
                    </div>
                  )
                }
              }}
            />
            <Pagination
              defaultPageSize="20"
              pageSize="20"
              onChange={onChange}
              defaultCurrent={page}
              total={totalPages * 20}
            />
          </Card>
        </Col>
      </div>
    </>
  )
}

export default LogsHistory

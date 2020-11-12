import React from 'react'

import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Description from './Description'

export default function DropDown(props) {
  return (
    <>
      <Dropdown
        placement="bottomCenter"
        overlay={
          <Menu>
            {props.itemList.map((element) => {
              return (
                <>
                  <Menu.Item>
                    <Description item={element} />
                  </Menu.Item>
                  <Menu.Divider />
                </>
              )
            })}
          </Menu>
        }
        trigger={['click']}
      >
        <a className="ant-dropdown-link" style={{ fontSize: 'large', textTransform: 'capitalize' }} onClick={(e) => e.preventDefault()}>
          {props.itemList[0].label} <DownOutlined />
        </a>
      </Dropdown>
    </>
  )
}

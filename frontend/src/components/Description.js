import React from 'react'
import { Tag } from 'antd'
import moment from 'moment'

export default function Description(props) {
  const item = props.item
  const code = props.code

  return (
    <>
      {console.log(code)}
      <div style={{ display: 'inline', fontSize: 'medium', color: 'black' }}>{item.userID.name} -</div>
      <div style={{ display: 'inline', fontSize: 'small' }}> {moment(item.created).format('MMM D YYYY, HH:mm')} </div>
      {code !== undefined ? <span style={{ fontSize: '2em', color: 'rgba(0,0,0,0.8)' }}>{String.fromCodePoint(code)}</span> : null}

      <div
        style={{
          display: 'inline',
          fontSize: 'large',
          color: 'rgb(199, 21, 133)'
        }}
      >
        {'   '}
        {item.cost.toFixed(2)} RON
      </div>

      <div style={{ display: 'block' }}>
        {item.tags.length
          ? item.tags.map((tag) => {
              return (
                <Tag style={{ display: 'inline-block' }} color="cyan">
                  {' '}
                  {tag}
                </Tag>
              )
            })
          : ''}
      </div>
      {item.description !== undefined ? (
        <p style={{ paddingTop: '10px', margin: '0px', fontSize: 'small' }}>Description: {item.description}</p>
      ) : (
        ''
      )}
    </>
  )
}

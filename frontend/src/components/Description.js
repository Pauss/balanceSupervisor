import React from 'react'

export default function Description(props) {
  const item = props.item
  const code = props.code

  return (
    <>
      {console.log(code)}
      <div style={{ display: 'inline', fontSize: 'medium', color: 'black' }}>{item.userID.name} -</div>
      <div style={{ display: 'inline', fontSize: 'medium' }}>
        {' '}
        {new Date(item.created).toDateString()} - {new Date(item.created).toLocaleTimeString()}
      </div>
      {code !== undefined ? <span style={{ fontSize: '2em', color: 'rgba(0,0,0,0.8)' }}>{String.fromCodePoint(code)}</span> : null}

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
  )
}

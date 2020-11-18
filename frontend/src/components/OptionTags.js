import React from 'react'
import { Mentions } from 'antd'

const { Option } = Mentions

const tags = ['carrefour', 'mega', 'EON', 'RDS']

function OptionTags() {
  function onChange(value) {
    console.log('Change:', value)
  }

  function onSelect(option) {
    console.log('select', option)
  }

  return (
    <>
      <Mentions
        style={{ textAlign: 'center', color: 'grey', borderColor: 'transparent' }}
        onChange={onChange}
        onSelect={onSelect}
        placeholder="input # to mention tag"
        prefix={'#'}
        className="itemList"
      >
        {tags.map((value) => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Mentions>
    </>
  )
}

export default OptionTags

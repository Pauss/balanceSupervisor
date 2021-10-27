import React, { useState } from 'react'
import { Mentions } from 'antd'

const { Option } = Mentions

const tags = ['carrefour', 'mega', 'EON', 'RDS']
const listInputTags = []

function OptionTags(props) {
  const [inputTags, setInputTags] = useState([])
  const [description, setDescription] = useState([])

  function onChange(value) {
    value = value.trim()

    //replace new line
    value = value.replace(/\r?\n|\r/g, ' ')

    //replave empty spaces
    value = value.replace(/\s\s+/g, ' ')

    const words = value.split(' ')

    var regex = RegExp('^[a-zA-Z0-9]+')
    console.log(words)

    //filter description wihtout tags
    value = words.filter((word) => regex.test(word))
    value = value.join(' ')

    //set description
    setDescription(value)
  }

  function onSelect(option) {
    listInputTags.push(option.value)
    setInputTags(listInputTags)
  }

  return (
    <>
      <Mentions
        style={{ textAlign: 'center', color: 'grey', borderColor: 'transparent' }}
        onChange={onChangeDescription}
        onSelect={onSelectTags}
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

import { message } from 'antd'

export const success = () => {
  message.success('Operation staus: Success!')
}

export const failure = (err) => {
  message.error(err)
}

export const warning = () => {
  message.warning('Incomplete data!')
}

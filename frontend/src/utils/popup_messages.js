import { message } from 'antd'

const duration = 0.5

export const success = () => {
  message.success('Operation staus: Success!', duration)
}

export const failure = (err) => {
  message.error(err, duration)
}

export const warning = () => {
  message.warning('Incomplete data!', duration)
}

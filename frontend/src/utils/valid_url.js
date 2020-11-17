const ADDRESS_PROD = 'https://cippau.go.ro/balance-supervisor/api'
const ADDRESS_DEV = 'http://192.168.100.15:4000' ////'192.168.100.15'

const ADDRESS = process.env.NODE_ENV === 'production' ? ADDRESS_PROD : ADDRESS_DEV

const URLs = {
  login: `${ADDRESS}/api/auth`,
  register: `${ADDRESS}/api/users/register`,
  logCost: `${ADDRESS}/api/costs/log`,
  getDashboard: `${ADDRESS}/api/costs/currentLogs`,
  history: `${ADDRESS}/api/costs/history`,
  deleteLog: `${ADDRESS}/api/costs/delete-log`
}

export default URLs

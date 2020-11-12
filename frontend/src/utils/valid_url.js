const IP_PROD = 'cippau.go.ro/balance-supervisor/api'
const IP_DEV = '192.168.100.15'

const PORT_DEV = '4000'
const PORT_PROD = '80'

const IP = process.env.NODE_ENV === 'production' ? IP_PROD : IP_DEV
const PORT = process.env.NODE_ENV === 'production' ? PORT_PROD : PORT_DEV

const URLs = {
  login: `http://${IP}:${PORT}/api/auth`,
  register: `http://${IP}:${PORT}/api/users/register`,
  logCost: `http://${IP}:${PORT}/api/costs/log`,
  getDashboard: `http://${IP}:${PORT}/api/costs/currentLogs`,
  history: `http://${IP}:${PORT}/api/costs/history`
}

export default URLs

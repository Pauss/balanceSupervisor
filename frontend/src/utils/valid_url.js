const IP_PROD = 'cippau.go.ro/balance-supervisor/api'
const IP_DEV = 'localhost'
//'192.168.100.15'

const PORT_DEV = '4000'
const PORT_PROD = '80'

const ADDRESS_PROD = 'http://cippau.go.ro:' + PORT_PROD + '/balance-supervisor/api'
const ADDRESS_DEV = 'http://' + IP_DEV + ':' + PORT_DEV

const ADDRESS = process.env.NODE_ENV === 'production' ? ADDRESS_PROD : ADDRESS_DEV

const URLs = {
  login: `${ADDRESS}/api/auth`,
  register: `${ADDRESS}/api/users/register`,
  logCost: `${ADDRESS}/api/costs/log`,
  getDashboard: `${ADDRESS}/api/costs/currentLogs`,
  history: `${ADDRESS}/api/costs/history`,
}

export default URLs

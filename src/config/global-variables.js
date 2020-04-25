// API: 'http://localhost:3000'; //"proxy": in package,json
// ENV: 'test' | 'dev' | 'prod'
const { protocol, hostname } = window.location

const Globals = {
  API: protocol + '//' + hostname + ':3000',
  ENV: 'test'
}

export default Globals

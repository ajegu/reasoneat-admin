import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

export default axios

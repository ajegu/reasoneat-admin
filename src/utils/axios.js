// import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
/* axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  Vue.$log.error('Server error', JSON.stringify(error))
  return Promise.reject(error)
}) */

export default axios

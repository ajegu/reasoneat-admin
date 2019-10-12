import { SET_CATEGORY_DATA } from '@/store/mutation-types'
import axios from 'axios'

const state = {
  data: []
}

const actions = {
  load({ commit }) {
    axios.get('http://localhost:8080/categories').then((response) => {
      commit(SET_CATEGORY_DATA, response.data.content)
    })
  }
}

const mutations = {
  [SET_CATEGORY_DATA]: (state, data) => {
    state.data = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

// import Vue from 'vue'
import { SET_CATEGORY_DATA } from '@/store/mutation-types'
import axios from '@/utils/axios'
import { Notification } from 'element-ui'

const state = {
  data: []
}

const actions = {
  async load({ commit }) {
    return axios.get('http://localhost:8080/categories').then((response) => {
      // Vue.$log.info('load categories', response)
      commit(SET_CATEGORY_DATA, response.data.content)
    }).catch(() => {
      Notification.error({
        title: 'Catégories',
        message: 'Une erreur est survenu lors du chargement des catégories'
      })
    })
  },
  async add(store, form) {
    console.log(form)
    return axios.post('http://localhost:8080/categories', JSON.stringify(form))
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

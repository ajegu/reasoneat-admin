import { SET_MONTH_LIST } from '@/store/mutations'
import { MONTH_API_LOAD } from '@/store/actions'
import axios from '@/utils/axios'
import { Notification } from 'element-ui'

/**
 * Définition du state
 */
const state = {
  list: []
}

/**
 * Implémentations des actions
 */
const actions = {
  /**
   * Charge la liste des mois depuis l'api
   * @param {object} store
   */
  async [MONTH_API_LOAD]({ commit }) {
    const url = `/months`
    try {
      const response = await axios.get(url)
      commit(SET_MONTH_LIST, response.data)
    } catch (failure) {
      console.error(failure)
      // On affiche une notification en cas d'erreur de l'api
      Notification.error({
        title: 'Mois',
        message: 'Une erreur est survenu lors du chargement des mois'
      })
      return Promise.reject(failure)
    }
  }
}

/**
 * Implémentation des mutations
 */
const mutations = {
  /**
   * Persiste la liste des mois dans le state
   * @param {object} state
   * @param {array} months
   */
  [SET_MONTH_LIST]: (state, months) => {
    state.list = months
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

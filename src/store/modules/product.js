import {
  PRODUCT_API_LOAD
} from '@/store/actions'
import {
  SET_PRODUCT_LIST
} from '@/store/mutations'
import axios from '@/utils/axios'
import { Notification } from 'element-ui'

/**
 * Définition du state
 */
const state = {
  list: [],
  dialogFormVisible: false,
  formData: {},
  formError: {},
  loading: false
}

/**
 * Implémentations des actions
 */
const actions = {
  /**
   * Chargement des produits depuis l'api
   * @param {object} store
   */
  async [PRODUCT_API_LOAD]({ commit }) {
    try {
      const response = await axios.get('/products')
      commit(SET_PRODUCT_LIST, response.data.content)
    } catch (failure) {
      console.error(failure)
      // On affiche une notification en cas d'erreur de l'api
      Notification.error({
        title: 'Produits',
        message: 'Une erreur est survenu lors du chargement des produits'
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
   * Persiste la liste des produits dans le state
   * @param {object} state
   */
  [SET_PRODUCT_LIST]: (state, products) => {
    state.list = products
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

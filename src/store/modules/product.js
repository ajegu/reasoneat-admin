import {
  PRODUCT_API_LOAD
} from '@/store/actions'
import {
  SET_PRODUCT_LIST,
  SET_PRODUCT_TOTAL
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
  loading: false,
  total: 0
}

/**
 * Implémentations des actions
 */
const actions = {
  /**
   * Chargement des produits depuis l'api
   * @param {object} store
   * @param {int} page
   */
  async [PRODUCT_API_LOAD]({ commit }, params) {
    const page = params.page - 1
    const sortProperty = params.prop
    let sortDirection = 'DESC'
    if (params.order === 'ascending') {
      sortDirection = 'ASC'
    }

    const url = `/products?page=${page}&sortProperty=${sortProperty}&sortDirection=${sortDirection}`
    try {
      const response = await axios.get(url)
      commit(SET_PRODUCT_LIST, response.data.content)
      commit(SET_PRODUCT_TOTAL, response.data.totalElements)
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
   * @param {array} products
   */
  [SET_PRODUCT_LIST]: (state, products) => {
    state.list = products
  },
  /**
   * Persiste le total de produits
   * @param {object} state
   * @param {int} total
   */
  [SET_PRODUCT_TOTAL]: (state, total) => {
    state.total = total
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

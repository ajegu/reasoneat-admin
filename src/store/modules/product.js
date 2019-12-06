import {
  PRODUCT_API_LOAD,
  PRODUCT_API_SAVE
} from '@/store/actions'
import {
  SET_PRODUCT_LIST,
  SET_PRODUCT_LIST_PARAMS,
  SET_PRODUCT_TOTAL,
  SET_PRODUCT_DIALOG_FORM_VISIBLE,
  SET_PRODUCT_FORM_DATA,
  SET_PRODUCT_FORM_ERROR

} from '@/store/mutations'
import axios from '@/utils/axios'
import { Notification } from 'element-ui'

/**
 * Définition du state
 */
const state = {
  list: [],
  listParams: null,
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
   * @param {object} params
   */
  async [PRODUCT_API_LOAD]({ commit }, params) {
    commit(SET_PRODUCT_LIST_PARAMS, params)

    const page = params.page - 1
    const sortProperty = params.prop
    let sortDirection = 'DESC'
    if (params.order === 'ascending') {
      sortDirection = 'ASC'
    }

    // Préparation des paramètres de filtre
    if (params.filters.category !== null && params.filters.category !== undefined) {
      const categories = []
      categories.push(params.filters.category)
      delete params.filters.category
      params.filters.categories = categories
    }

    const url = `/products?page=${page}&sortProperty=${sortProperty}&sortDirection=${sortDirection}&filters=${encodeURIComponent(JSON.stringify(params.filters))}`
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
  },
  /**
   * Enregistre un produit
   * @param {object} store
   */
  async [PRODUCT_API_SAVE]({ commit, dispatch, state }) {
    const form = { ...state.formData }

    // On prépare la valeur de `months`
    if (form.months !== null && form.months !== undefined) {
      const months = []
      form.months.forEach((monthId) => {
        months.push({
          month_id: monthId
        })
      })
      form.months = months
    }

    // On prépare la valeur de `category`
    if (form.category !== null && form.category !== undefined) {
      form.category = { category_id: form.category }
    }

    try {
      if (form.product_id === null || form.product_id === undefined) {
        await axios.post('/products', JSON.stringify(form))
        Notification.success({
          title: 'Produits',
          message: 'Le produit a bien été créé'
        })
        await dispatch(PRODUCT_API_LOAD, state.listParams)
      } else {
        const response = await axios.put(`/products/${form.category_id}`, JSON.stringify(form))
        const productUpdated = response.data
        const products = state.list.map((product) => {
          if (product.product_id === form.product_id) {
            return productUpdated
          }
          return product
        })
        commit(SET_PRODUCT_LIST, products)
      }
    } catch (failure) {
      console.error(failure)
      if (failure.response.status === 400) {
        const errors = failure.response.data.errors
        for (const [code, message] of Object.entries(errors)) {
          const codeEls = code.split('.')
          const error = {
            field: codeEls[0],
            message: message
          }
          commit(SET_PRODUCT_FORM_ERROR, error)
        }
      }
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
   * Persiste les paramètres nécessaire à recharger la liste
   * @param {object} state
   * @param {array} params
   */
  [SET_PRODUCT_LIST_PARAMS]: (state, params) => {
    state.listParams = params
  },
  /**
   * Persiste le total de produits
   * @param {object} state
   * @param {int} total
   */
  [SET_PRODUCT_TOTAL]: (state, total) => {
    state.total = total
  },
  /**
   * Définit l'état de visibilité de la fenêtre du form
   * @param {object} state
   * @param {boolean} visible
   */
  [SET_PRODUCT_DIALOG_FORM_VISIBLE]: (state, visible) => {
    state.dialogFormVisible = visible
  },
  /**
   * Spécifie le produit à modifier
   * @param {object} state
   * @param {object} category
   */
  [SET_PRODUCT_FORM_DATA]: (state, category) => {
    state.formData = category
  },
  /**
   * Ajoute une erreur à l'object formError
   * @param {object} state
   * @param {object} error
   */
  [SET_PRODUCT_FORM_ERROR]: (state, error) => {
    if (error === null) {
      state.formError = {}
    } else {
      const formError = { ...state.formError }
      formError[error.field] = error.message
      state.formError = formError
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

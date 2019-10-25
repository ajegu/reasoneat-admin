import {
  SET_CATEGORY_LIST,
  SET_CATEGORY_DIALOG_FORM_VISIBLE,
  SET_CATEGORY_FORM_DATA,
  SET_CATEGORY_FORM_ERROR
} from '@/store/mutations'
import {
  CATEGORY_API_LOAD,
  CATEGORY_FORM_UPDATE,
  CATEGORY_API_SAVE
} from '@/store/actions'
import axios from '@/utils/axios'
import { Notification } from 'element-ui'
import { isNullOrUndefined } from 'util'
import { Promise } from 'q'

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
   * Charge la liste des catégories depuis l'api
   * @param {object} store
   */
  async [CATEGORY_API_LOAD]({ commit }) {
    try {
      const response = await axios.get('http://localhost:8080/categories')
      commit(SET_CATEGORY_LIST, response.data.content)
    } catch (failure) {
      console.error(failure)
      // On affiche une notification en cas d'erreur de l'api
      Notification.error({
        title: 'Catégories',
        message: 'Une erreur est survenu lors du chargement des catégories'
      })
      return Promise.reject(failure)
    }
  },
  /**
   * Récupère et clone la catégorie à modifier
   * @param {object} store
   * @param {string} categoryId
   */
  [CATEGORY_FORM_UPDATE]({ commit, state }, categoryId) {
    state.list.map((category) => {
      if (category.id === categoryId) {
        const categoryUpdated = { ...category }
        commit(SET_CATEGORY_FORM_DATA, categoryUpdated)
      }
    })
  },
  /**
   *
   * @param {object} store
   */
  async [CATEGORY_API_SAVE]({ commit, state, dispatch }) {
    try {
      if (isNullOrUndefined(state.formData.id)) {
        const response = await axios.post('http://localhost:8080/categories', JSON.stringify(state.formData))
        const categories = state.list.map(category => ({ ...category }))
        categories.push(response.data)
        commit(SET_CATEGORY_LIST, categories)
      } else {
        const response = await axios.put(`http://localhost:8080/categories/${state.formData.id}`, JSON.stringify(state.formData))
        const categoryUpdated = response.data
        const categories = state.list.map((category) => {
          if (category.id === state.formData.id) {
            return categoryUpdated
          }
          return category
        })
        commit(SET_CATEGORY_LIST, categories)
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
          commit(SET_CATEGORY_FORM_ERROR, error)
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
   * Persiste la liste des catégories dans le state
   * @param {object} state
   */
  [SET_CATEGORY_LIST]: (state, categories) => {
    state.list = categories
  },
  /**
   * Définit l'état de visibilité de la fenêtre du form
   * @param {object} state
   * @param {boolean} visible
   */
  [SET_CATEGORY_DIALOG_FORM_VISIBLE]: (state, visible) => {
    state.dialogFormVisible = visible
  },
  /**
   * Spécifie la catégorie à modifier
   * @param {object} state
   * @param {object} category
   */
  [SET_CATEGORY_FORM_DATA]: (state, category) => {
    state.formData = category
  },
  /**
   * Ajoute une erreur à l'object formError
   * @param {object} state
   * @param {object} error
   */
  [SET_CATEGORY_FORM_ERROR]: (state, error) => {
    const formError = { ...state.formError }
    formError[error.field] = error.message
    state.formError = formError
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

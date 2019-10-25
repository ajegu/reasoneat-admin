import { SET_ROLES } from '@/store/mutations'

const state = {
  roles: []
}

const mutations = {
  /**
   *
   * @param {*} state
   * @param Array roles
   */
  [SET_ROLES]: (state, roles) => {
    state.roles = roles
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

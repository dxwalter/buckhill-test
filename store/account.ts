import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { UserData } from '../types'
// import { RootState } from './types'
export const state = () => ({
  user: null as UserData | null,
  isLoggedIn: false as boolean | number,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getData: (state): UserData | null => state.user,
  getLoginStatus: (state): boolean | number => state.isLoggedIn,
  getProfilePicture: (state) => state.user?.avatar,
}

export const mutations: MutationTree<RootState> = {
  STORE_USER_DATA: (state, data: UserData) => (state.user = data),
  STORE_LOGIN_STATUS: (state, data: boolean | number) =>(state.isLoggedIn = data),
  RESET_STORE_DATA: (state) => {
    state.user = null
    state.isLoggedIn = false
  },
}

export const actions: ActionTree<RootState, RootState> = {
  saveUserData({ commit }, data: UserData) {
    commit('STORE_USER_DATA', data)
    // eslint-disable-next-line no-console
  },
  saveUserLoginStatus({ commit }, data: boolean | number) {
    commit('STORE_LOGIN_STATUS', data)
    // eslint-disable-next-line no-console
  },
  logout: ({ commit }) => {
    localStorage.removeItem('buckhill-test')
    commit('RESET_STORE_DATA')
  },
}

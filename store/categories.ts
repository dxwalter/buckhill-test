import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Category } from '../types'
// import { RootState } from './types'
export const state = () => ({
  categories: [] as Category[] | any[],
  lastUptdated: 0 as number,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAllCategories: (state): Category[] => state.categories,
  getCategoryLastUpdated: (state): number => state.lastUptdated
}

export const mutations: MutationTree<RootState> = {
  STORE_CATEGORIES_DATA: (state, data: Category[]) => (state.categories = data),
  STORE_LAST_UPDATED: (state, data: number) =>(state.lastUptdated = data),
  RESET_CATEGORIES_DATA: (state) => {
    state.categories = []
    state.lastUptdated = 0
  },
}

export const actions: ActionTree<RootState, RootState> = {
  saveAllCategories({ commit }, data: Category[]) {
    commit('STORE_CATEGORIES_DATA', data)
    // eslint-disable-next-line no-console
  },
  saveLastCategoryUpdated({ commit }, data: number) {
    commit('STORE_LAST_UPDATED', data)
    // eslint-disable-next-line no-console
  }
}

import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Brand } from '../types'
// import { RootState } from './types'
export const state = () => ({
  brands: [] as Brand[] | any[],
  lastUptdated: 0 as number,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAllBrands: (state): Brand[] => state.brands,
  getBrandLastUpdated: (state): number => state.lastUptdated
}

export const mutations: MutationTree<RootState> = {
  STORE_BRAND_DATA: (state, data: Brand[]) => (state.brands = data),
  STORE_LAST_UPDATED: (state, data: number) =>(state.lastUptdated = data),
  RESET_BRANDS_DATA: (state) => {
    state.brands = []
    state.lastUptdated = 0
  },
}

export const actions: ActionTree<RootState, RootState> = {
  saveAllBrands({ commit }, data: Brand[]) {
    commit('STORE_BRAND_DATA', data)
    // eslint-disable-next-line no-console
  },
  saveLastBrandUpdated({ commit }, data: number) {
    commit('STORE_LAST_UPDATED', data)
    // eslint-disable-next-line no-console
  }
}

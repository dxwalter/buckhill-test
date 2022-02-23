import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { CartItem } from '../types'
// import { RootState } from './types'
export const state = () => ({
  cart: [] as CartItem[] | any[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getAllCart: (state): CartItem[] => state.cart,
}

export const mutations: MutationTree<RootState> = {
  STORE_CART_DATA: (state, data: CartItem) => (state.cart.push(data)),

  UPDATE_CART_QUANTITY: (state, data: CartItem) => {
    const allCartItems: CartItem[] = state.cart;
    const updatedData = [] as CartItem[];

    allCartItems.forEach(element => {
        if (element.uuid === data.uuid) {
            element.quantity = data.quantity
            updatedData.push(element)
        } else {
            updatedData.push(element)
        }
    });

    state.cart = updatedData
  },

  REMOVE_CART_ITEM: (state, data: string) => {
    const cartItems: CartItem[] = state.cart
    state.cart = cartItems.filter((item) => item.uuid !== data)
  }

}

export const actions: ActionTree<RootState, RootState> = {
  addToCart({ commit }, data: CartItem) {
    commit('STORE_CART_DATA', data)
    // eslint-disable-next-line no-console
  },
  updateCartQuantity({ commit }, data: CartItem) {
    commit('UPDATE_CART_QUANTITY', data)
    // eslint-disable-next-line no-console
  },

  removeCartItem({ commit }, uuid: string) {
      commit('REMOVE_CART_ITEM', uuid)
  }
}

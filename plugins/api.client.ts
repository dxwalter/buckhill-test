import api from '../api'

// export default ({ app, store, $config }: any, inject: any) => {
export default ({ store, $axios, $cookies}: any, inject: any) => {
  $cookies.set('token', store.state.account.user?.token)
  api.setStore(store)
  api.setBase($axios.defaults.baseURL)
  api.setToken($cookies.get('token'))
  inject('api', api)


}

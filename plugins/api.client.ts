import api from '../api'

// export default ({ app, store, $config }: any, inject: any) => {
export default ({ store, $axios, $cookies }: any, inject: any) => {
  const storedData = JSON.parse(
    localStorage.getItem('buckhill-test') as unknown as string
  )
  if (storedData) {
    $cookies.set('token', storedData.account?.user?.token)
  }
  api.setStore(store)
  api.setBase($axios.defaults.baseURL)
  api.setToken($cookies.get('token'))
  inject('api', api)
}

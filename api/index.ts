import axios, { Method, AxiosResponse } from 'axios';

const instance = axios.create()

class Api {

  private token: string = '';
  private base: string = '';
  private store: any = undefined

  __jsonRequest(method: Method, url: string, data = {}, params = {}, contentType = undefined) {

    const onUploadProgress = (event: {
      total: number,
      loaded: number
    }) => {
      if (contentType !== undefined) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total)
        this.store.dispatch('counters/saveImageProgress', percentCompleted)
      }
    }

    return instance.request({
      url,
      method,
      data,
      params: {
        ...params,
      },
      onUploadProgress,
      headers: {
        'Content-Type':
          contentType !== undefined ? contentType : 'application/json',
        ...(this.token ? { Authorization: 'Bearer ' + this.token } : {}),
      },
    })
  }

  async __request(
    method: Method,
    url: string,
    data = undefined,
    params = undefined,
    contentType = undefined
  ) {
    try {
      url = url.includes('http') ? url : `${this.base}${url}`
      const res = await this.__jsonRequest(
        method,
        url,
        data,
        params,
        contentType
      )
      if (res.data.success === 1 || res.data.success === undefined) {
        return Promise.resolve(res.data)
      }
      
      return Promise.resolve(res.data)
    } catch (e: any) {
      if (e.response) {
        if (e.response.status === 401) {
          window.document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          window.document.cookie =
            'account=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          window.document.cookie =
            'kyc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          window.location.href = '/logout'
          return false
        }
        return Promise.reject(e.response.data)
      }
      return Promise.reject(e)
    }
  }

  async __multiRequest(
    url: Promise<AxiosResponse<any>>[]
  ) {
    try {

      const res = await axios.all(url);
      
      const result: any = []

      res.forEach(element => {
        result.push(element.data.data)
      });

      return Promise.resolve(result)

    } catch (e: any) {
      if (e.response) {
        if (e.response.status === 401) {
          window.document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          window.document.cookie =
            'account=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          window.document.cookie =
            'kyc=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          window.location.href = '/logout'
          return false
        }
        return Promise.reject(e.response.data)
      }
      return Promise.reject(e)
    }
  }

  setToken(token: string) {
    this.token = token
  }

  setBase(token: string) {
    this.base = token
  }

  setStore(store: any) {
    this.store = store
  }

  /*
   * Authentication
   * */
  async register(data: any) {
    return await this.__request('post', '/user/create', data)
  }

  async login(data: any) {
    return  await this.__request('post', '/user/login', data)
  }

  async logout() {
    return await this.__request('get', '/user/logout')
  }

  async recoverPasswordLink(data: any) {
    return await this.__request('post', '/user/forgot-password', data)
  }

  async resetPassword(data: any) {
    return  await this.__request('post', '/user/reset-password-token', data)
  }

  async getUser() {
    return await this.__request('get', '/user')
  }

  // promotion

  async getPromotion () {
    return await this.__request('get', '/main/promotions?page=1&limit=1&sortBy=image&desc=true&valid=true')
  }

  async getAllCategories () {
    return await this.__request('get', '/categories')
  }

  async getProductsFromMultiCategories(url: string[]) {
    const requestOne: Promise<AxiosResponse<any>> = axios.get(`${this.base}/${url[0]}`)
    const requestTwo: Promise<AxiosResponse<any>> = axios.get(`${this.base}/${url[1]}`)
    return await this.__multiRequest([requestOne, requestTwo])
  }

}

export default new Api()
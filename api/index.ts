import axios, { Method } from 'axios';

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

      if (res.data.success === 1) {
        return res.data
      }
      return Promise.reject(res.data)
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
  register(data: any) {
    return this.__request('post', '/user/create', data)
  }

}

export default new Api()

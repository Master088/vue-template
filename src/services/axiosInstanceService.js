import axios from 'axios'
import router from '@/router'

import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { useAuthenticationStore } from '@/stores/auth'
import { eraseCookie, getCookie, setCookie, getLocalStorage } from '@/utils/storageManager'
import { getRefreshTokenExpiration } from '@/utils/tokenManager'

const baseURL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 100000, // 100 seconds timeout
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/form-data',
    accept: 'application/form-data',
    common: {
      'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  },
})

const refreshAuthLogic = async (failedRequest) => {
  const authStore = useAuthenticationStore()

  const refresh_token = getCookie('rfc7519_refresh_token') || null

  axiosInstance.defaults.responseType = null

  if (refresh_token) {
    const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]))

    // exp date in token is expressed in seconds, while now() returns milliseconds:
    const now = Math.ceil(Date.now() / 1000)

    /*Valid refesh token*/
    if (tokenParts.exp > now) {
      return axiosInstance.post('auth/refresh').then((response) => {
        const data = response.data.response

        /**Set token */
        setCookie('rfc7519', response.data.response.access_token, 1440)

        let user = getCookie('user_data')

        setCookie('user_data', user, 1440)

        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + data.access_token

        failedRequest.response.config.headers.Authorization = `Bearer ${data.access_token}`

        return Promise.resolve()
      })
    } else {
      /**Force Logout */
      //  eraseCookie("rfc7519")
      //  eraseCookie("rfc7519_refresh_token")
      //  eraseCookie("user_data")

      // authStore.$reset()
      // authStore.isLoggedIn = false
      // router.push('/auth/login')
      authStore.isSessionExpired = true

      return Promise.resolve()
    }
  } else {
    /**Force Logout */
    //  eraseCookie("rfc7519")
    //  eraseCookie("rfc7519_refresh_token")
    //  eraseCookie("user_data")

    // authStore.$reset()
    // authStore.isLoggedIn = false
    // router.push('/auth/login')
    authStore.isSessionExpired = true
    // return Promise.resolve()
  }
}

axiosInstance.interceptors.request.use(async (request) => {
  const accessToken = getCookie('rfc7519')

  const refreshToken = getCookie('rfc7519_refresh_token')

  if (accessToken) {
    if (request.url === 'account/refresh') {
      request.headers.Authorization = `Bearer ${refreshToken}`
    } else {
      request.headers['X-Forwarded-For'] = getLocalStorage('ipaddress')
        ? getLocalStorage('ipaddress')
        : null
      request.headers.Authorization = `Bearer ${accessToken}`
    }
  }
  return request
})

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic)

export default axiosInstance

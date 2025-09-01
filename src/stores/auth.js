import { defineStore } from 'pinia'
import authenticationService from '@/services/auth'
import {
  setCookie,
  getCookie,
  setLocalStorage,
  deleteLocalStorage,
  eraseCookie,
} from '@/utils/storageManager'
import { getRefreshTokenExpiration } from '@/utils/tokenManager'

export const useAuthenticationStore = defineStore('authentication', {
  state: () => {
    const user = getCookie('user_data') || {
      is_authenticated: false,
      user_data: {},
      remember_me: false,
    }

    const accessToken = getCookie('rfc7519') || null
    // const refreshToken = getCookie('rfc7519_refresh_token') || null
    console.log('accessToken', accessToken)
    return {
      isAuthenticated: user.is_authenticated,
      userAccount: user.user_data || {},
      accessToken,
      // refreshToken,
      rememberMe: user.remember_me,
      isSessionExpired: false,
    }
  },

  actions: {
    /** 🔹 LOGIN */
    async login(payload) {
      try {
        const data = await authenticationService.loginUser({
          email: payload.email,
          password: payload.password,
        })

        this.isAuthenticated = true

        /** Set tokens */
        this.setTokens(data.access_token, 1440)

        this.accessToken = data.access_token
        this.refreshToken = data.refresh_token
        this.rememberMe = payload.rememberMe

        /** Get user details */
        const userData = await this.getLoginUser()
        console.log(userData)
        if (this.rememberMe) {
          setLocalStorage('remember_me', {
            email: userData.email,
            remember_me: true,
          })
        } else {
          deleteLocalStorage('remember_me')
        }

        return Promise.resolve(data)
      } catch (err) {
        console.error('Login failed:', err)
        return Promise.reject(err)
      }
    },

    /** 🔹 FETCH LOGGED-IN USER */
    async getLoginUser() {
      try {
        const data = await authenticationService.getLoginUser()

        setCookie(
          'user_data',
          {
            is_authenticated: true,
            user_data: data,
          },
          1440,
        )

        this.userAccount = data
        return data
      } catch (err) {
        console.error('Fetching user failed:', err)
        return Promise.reject(err)
      }
    },

    /** 🔹 LOGOUT */
    async logout() {
      try {
        await authenticationService.logoutUser()

        this.isAuthenticated = false
        this.userAccount = {}

        eraseCookie('rfc7519')
        eraseCookie('rfc7519_refresh_token')
        eraseCookie('user_data')

        return Promise.resolve()
      } catch (err) {
        console.error('Logout error:', err)
        return Promise.reject(err)
      }
    },

    /** 🔹 REFRESH TOKEN */
    async refreshTokenAction() {
      try {
        const data = await authenticationService.refreshToken()
        this.setTokens(data.access_token, data.refresh_token, 1440)
        this.accessToken = data.access_token
        this.refreshToken = data.refresh_token
        return data
      } catch (err) {
        console.error('Token refresh failed:', err)
        return Promise.reject(err)
      }
    },

    /** 🔹 HELPER */
    setTokens(access_token, exp) {
      this.accessToken = access_token
      setCookie('rfc7519', access_token, exp)
    },
  },
})

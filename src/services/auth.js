import axiosInstance from './axiosInstanceService'

export default {
  // ✅ Login
  async loginUser(payload) {
    try {
      const response = await axiosInstance.post('auth/login', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      })

      // set default auth header for future requests
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access_token

      return response.data
    } catch (err) {
      console.error('Login error:', err)
      throw err
    }
  },

  // ✅ Register
  async registerUser(payload) {
    try {
      const response = await axiosInstance.post('auth/register', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      })
      return response.data
    } catch (err) {
      console.error('Register error:', err)
      throw err
    }
  },

  // ✅ Get Authenticated User
  async getLoginUser() {
    try {
      const response = await axiosInstance.get('auth/me')
      return response.data
    } catch (err) {
      console.error('Get logged-in user error:', err)
      throw err
    }
  },

  // ✅ Logout
  async logoutUser() {
    try {
      const response = await axiosInstance.post('auth/logout')
      delete axiosInstance.defaults.headers['Authorization']
      return response.data
    } catch (err) {
      console.error('Logout error:', err)
      throw err
    }
  },

  // ✅ Refresh JWT Token
  async refreshToken() {
    try {
      const response = await axiosInstance.post('auth/refresh')
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access_token
      return response.data
    } catch (err) {
      console.error('Refresh token error:', err)
      throw err
    }
  },
}

import axiosInstance from './axiosInstanceService'
import qs from 'qs'

// ✅ Create User
export const addUserService = async (payload) => {
  try {
    const response = await axiosInstance.post('users', payload, {
      headers: {
        ...axiosInstance.defaults.headers,
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

// ✅ Get Users (with filters/search/pagination)
export const getUserService = async (params, signal) => {
  try {
    const response = await axiosInstance.get('users', {
      headers: {
        ...axiosInstance.defaults.headers,
        'Cache-Control': 'no-store',
      },
      params,
      signal,
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          arrayFormat: 'repeat',
          encode: false,
        })
      },
    })
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

// ✅ Update User
export const editUserService = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`users/${id}`, data, {
      headers: {
        ...axiosInstance.defaults.headers,
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

// ✅ Get User by ID
export const getUserByIdService = async (id) => {
  try {
    const response = await axiosInstance.get(`users/${id}`)
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

// ✅ Delete User
export const deleteUserService = async (id) => {
  try {
    const response = await axiosInstance.delete(`users/${id}`)
    return response
  } catch (err) {
    console.error(err)
    throw err
  }
}

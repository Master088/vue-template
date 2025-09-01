import { defineStore } from 'pinia'
import {
  addUserService,
  getUserService,
  editUserService,
  getUserByIdService,
  deleteUserService,
} from '@/services/userService'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const totals = ref(0)

  /** 🔹 Create User */
  const addUser = async (payload) => {
    try {
      const response = await addUserService(payload)
      users.value.push(response.data.response)
      return response.data.response
    } catch (err) {
      console.error('Error adding user:', err)
      throw err
    }
  }

  /** 🔹 Get All Users */
  const getAllUser = async (params, signal) => {
    try {
      const response = await getUserService(params, signal)
      users.value = response.data.response.users || []
      totals.value = response.data.response.total || 0
    } catch (err) {
      console.error('Error fetching users:', err)
      throw err
    }
  }

  /** 🔹 Edit User */
  const editUser = async (payload) => {
    try {
      const response = await editUserService({
        id: payload.id,
        data: payload.data,
      })

      const index = users.value.findIndex((user) => user.id === payload.id)
      if (index !== -1) {
        users.value[index] = response.data.response
      }

      return response.data.response
    } catch (err) {
      console.error('Error editing user:', err)
      throw err
    }
  }

  /** 🔹 Delete (Archive) User */
  const deleteUser = async (id) => {
    try {
      const response = await deleteUserService(id)
      const index = users.value.findIndex((user) => user.id === id)
      if (index !== -1) {
        users.value.splice(index, 1)
      }
      return response.data.response
    } catch (err) {
      console.error('Error deleting user:', err)
      throw err
    }
  }

  /** 🔹 Get User By ID */
  const getUserById = async (id) => {
    try {
      const response = await getUserByIdService(id)
      return response.data.response
    } catch (err) {
      console.error('Error fetching user:', err)
      throw err
    }
  }

  return {
    users,
    totals,
    addUser,
    getAllUser,
    editUser,
    getUserById,
    deleteUser,
  }
})

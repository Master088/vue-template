import { getCookie } from './storageManager'

export const parseUserIdFromToken = (access_token = null) => {
  if (access_token !== null) {
    const base64Payload = access_token.split('.')[1]
    const decodedPayload = atob(base64Payload)
    const userId = JSON.parse(decodedPayload).sub
    return userId
  }

  const cookie = getCookie('rfc7519')

  const token = cookie ? cookie : null

  if (!token) {
    return { sub: null }
  }

  try {
    const base64Payload = token.split('.')[1]
    const decodedPayload = atob(base64Payload)
    const userId = JSON.parse(decodedPayload).sub
    return userId
  } catch (error) {
    console.error('Failed to parse JWT token:', error)
    return { sub: null }
  }
}

export const getRefreshTokenExpiration = (refresh_token) => {
  if (!refresh_token) return 0

  const tokenParts = JSON.parse(atob(refresh_token.split('.')[1]))
  const now = Math.ceil(Date.now() / 1000)

  if (tokenParts.exp > now) {
    const cookiesExpiration = tokenParts.exp - now // Expiration in seconds

    // Convert seconds to days
    let days = cookiesExpiration / (60 * 60 * 24)

    return days.toFixed(2) // Returns days with two decimal places
  }

  return 0 // Return 0 if the token has already expired
}

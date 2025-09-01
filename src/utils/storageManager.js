import { encryptCookie, decryptCookie, utf8ToB64, b64ToUtf8 } from '@/utils/hashingManager'

const isProduction = import.meta.env.VITE_APP_ENV === 'production'

export const setManageCookie = (key, str, exmins) => {
  try {
    const value = JSON.stringify(str)
    const encode = utf8ToB64(value)
    const d = new Date()
    d.setTime(d.getTime() + exmins * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = key + '=' + encode + ';' + expires + ';path=/;samesite'
  } catch (error) {
    console.error('Error encrypting and setting cookie:', error)
    throw error
  }
}

export const getManageCookie = (key) => {
  let name = key + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      const decode = b64ToUtf8(c.substring(name.length, c.length))
      return JSON.parse(decode)
    }
  }
  return ''
}

export const deleteManageCookie = (key) => {
  const d = new Date()
  let expires = 'expires=' + d.toUTCString()
  document.cookie = key + '=' + ';Path=/' + ';' + expires
}

// Function to set a cookie with encryption
export const setCookie = (name, value, days, sameSite = 'Strict') => {
  try {
    const encryptedValue = encryptCookie(value)
    if (!encryptedValue) {
      throw new Error('Encryption failed')
    }

    let cookie = `${name}=${encodeURIComponent(encryptedValue)}; path=/`

    if (days) {
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
      cookie += `; expires=${expires}`
    }

    if (isProduction) {
      cookie += '; Secure'
    }

    if (sameSite) {
      cookie += `; SameSite=${sameSite}`
    }

    document.cookie = cookie.trim()
  } catch (error) {
    console.error('Error encrypting and setting cookie:', error)
    throw error
  }
}

export const getCookie = (name) => {
  if (!name || typeof name !== 'string') {
    console.error('Invalid cookie name provided')
    return null
  }

  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim())

  for (const cookie of cookies) {
    if (cookie.startsWith(nameEQ)) {
      const encryptedValue = cookie.substring(nameEQ.length)

      if (!encryptedValue) {
        console.error('Cookie found, but the value is empty')
        return null
      }

      try {
        // Decode the encrypted value
        const decodedValue = decodeURIComponent(encryptedValue)

        // Attempt to decrypt the value
        const decryptedValue = decryptCookie(decodedValue)

        // Check if the decrypted value is valid
        if (!decryptedValue) {
          return null
        }

        return decryptedValue // Return the successfully decrypted value
      } catch (error) {
        console.error('Error decrypting cookie:', error.message)
        return null // Exit safely instead of throwing
      }
    }
  }

  // If no matching cookie is found, return null
  return null
}

// Function to erase a cookie by name
export const eraseCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/; Secure; SameSite=Strict`
}

export const setLocalStorage = (key, str) => {
  const value = JSON.stringify(str)
  const encode = utf8ToB64(value)
  localStorage.setItem(key, encode)
}

export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    const decode = b64ToUtf8(localStorage.getItem(key)) || ''
    return JSON.parse(decode)
  }
  return ''
}

export const deleteLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export const setSessionStorage = (key = '', str = {}, isEncrypt = true) => {
  const value = JSON.stringify(str)
  const code = isEncrypt ? utf8ToB64(value) : value
  const encode = code
  sessionStorage.setItem(key, encode)
}

export const getSessionStorage = (key = '', isEncrypt = true) => {
  if (sessionStorage.getItem(key)) {
    const code = isEncrypt
      ? b64ToUtf8(sessionStorage.getItem(key) || '{}')
      : sessionStorage.getItem(key)
    const decode = code || ''
    return JSON.parse(decode)
  }
  return ''
}

export const deleteSessionStorage = (key = '') => {
  sessionStorage.removeItem(key)
}

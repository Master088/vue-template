import CryptoJS from 'crypto-js'

// Define the hexDecode function
const hexDecode = (s) => CryptoJS.enc.Hex.parse(s)

// Define the hexEncode function
const hexEncode = (b) => CryptoJS.enc.Hex.stringify(b)

// Encrypts the message using AES encryption
export const encryptMessage = (value) => {

  try {
    const decodedKey = hexDecode(import.meta.env.VITE_ENCRYPTION_KEY)
  
    const iv = CryptoJS.lib.WordArray.random(16)
    const ciphertext = CryptoJS.AES.encrypt(value?.toString(), decodedKey, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding
    })

    const concatenated = iv.clone().concat(ciphertext.ciphertext)
    return hexEncode(concatenated)
  } catch (error) {
    console.error('Encryption error:', error)
    throw error
  }
}

// Define the decryptMessage function
export const decryptMessage = (encryptedValue) => {
  try {
    const decodedKey = hexDecode(import.meta.env.VITE_ENCRYPTION_KEY)
    const encryptedHex = hexDecode(encryptedValue)
    const iv = encryptedHex.clone()
    iv.sigBytes = 16 // set iv length to 16 bytes
    iv.clamp()
    const ciphertext = encryptedHex.clone()
    ciphertext.words.splice(0, 4) // remove IV from ciphertext
    ciphertext.sigBytes -= 16 // adjust ciphertext length

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, decodedKey, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Decryption error:', error)
    return null // or handle the error as appropriate
  }
}

// Function to serialize data before encryption
const serializeData = (data) => JSON.stringify(data)

// Function to deserialize data after decryption
const deserializeData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, import.meta.env.VITE_ENCRYPTION_KEY)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedData)
  } catch (error) {
    console.error('Error deserializing data:', error)
    return null
  }
}

export const encryptCookie = (message) => {
  try {
    const serializedMessage = serializeData(message)
    return CryptoJS.AES.encrypt(serializedMessage, import.meta.env.VITE_ENCRYPTION_KEY).toString()
  } catch (error) {
    console.error('Error encrypting message:', error)
    return null
  }
}

export const decryptCookie = (encryptedMessage) => {
  try {
    return deserializeData(encryptedMessage)
  } catch (error) {
    console.error('Error decrypting message:', error)
    return null
  }
}

// Base64 encryption
export const utf8ToB64 = (str = '') => {
  return btoa(unescape(encodeURIComponent(str)))
}

// decryption of Base64
export const b64ToUtf8 = (str = '') => {
  return decodeURIComponent(escape(atob(str)))
}

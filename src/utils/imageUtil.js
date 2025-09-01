export async function getImageSrc(baseName, state) {
  try {
    const image = await import(`@/assets/images/icons/ticket/${baseName}-${state}.svg`)
    return image.default
  } catch (error) {
    console.error(`Image not found: ${baseName}-${state}`, error)
    return '' // Fallback image or empty string
  }
}

export const getImagePath = (path, fileName) => {
  try {
    if (path.startsWith('@/')) {
      path = path.replace('@/', '/src/')
    }
    const image = new URL(path, import.meta.url).href
    return image
  } catch (error) {
    console.error(`Image not found: ${fileName}.svg`, error)
    return '' // Fallback image or empty string
  }
}

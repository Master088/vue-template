/* This file is for string manipulation functions */
export const formatPhoneNumber = (number) => {
  return number.replace(
    /(\+\d{1,2})?[\s-]?[\\(]?(\d{3})[\\)]?[\s-]?(\d{3})[\s-]?(\d{4})/,
    (match, p1, p2, p3, p4) => {
      return `${p1 ? p1 + '-' : ''}${p2}-${p3}-${p4}`
    }
  )
}

export const generateInitials = (firstname = '', lastname = '') => {
  const firstNameInitials = firstname
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')

  const lastNameInitial = lastname.charAt(0).toUpperCase()

  return `${firstNameInitials}${lastNameInitial}`
}

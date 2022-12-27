export const emailRules = [
  (email: string) => !!email || 'Field is required',
  (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const matches = email?.match(regex)
    return !!matches?.length || 'Must be a valid email address'
  },
  (email?: string) => {
    const invalid = ['\'', '\`', '\<', '\>', '\-', '&lt;', '&gt;']
    const strikes = invalid.filter(str => email?.includes(str) ?? false)
    return strikes.length === 0 || 'Invalid input'
  }
]

export const passwordRules = [
  (password: string) => !!password || 'Field is required'
]
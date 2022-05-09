export const auth = async (username: string, password: string) => {
  const response = await fetch('http://localhost:3100/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  if (response.ok) {
    const user = await response.json()
    return user
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}
export const userReducer = (user = null, action: any) => {
  switch (action.type) {
    case 'USER@LOGIN': {
      const user = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    case 'USER@LOGOUT': {
      localStorage.removeItem('user')
      return null
    }
    default:
      return user
  }
}


export const userReducer = (user = null, action: any) => {
  switch (action.type) {
    case 'USER@LOGIN': {
      const user = action.payload
      return user
    }
    default:
      return user
  }
}


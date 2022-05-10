import jwtDecode from "jwt-decode"
import { User } from "../entities/User"
import { Token } from "../entities/Token"

export enum Roles {
  Admin = 'admin'
}

export const auth = async (username: string, password: string): Promise<User> => {
  const response = await fetch('http://localhost:3100/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  if (response.ok) {
    const user = await response.json() as User
    const decodedToken = jwtDecode(user.accessToken) as Token
    if (decodedToken.role !== Roles.Admin) {
      throw new Error('Unauthorized')
    }
    return user
  }
  const error = await response.json()
  throw new Error(error.message, { cause: error })
}
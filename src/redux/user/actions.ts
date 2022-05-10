import { User } from "../../entities/User"

export const login = (user: User) => {
  return {
    type: 'USER@LOGIN',
    payload: user
  }
}
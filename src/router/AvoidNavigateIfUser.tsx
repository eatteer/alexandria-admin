import { FC } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: JSX.Element
}

export const AvoidNavigateIfUser: FC<Props> = ({ children }) => {
  /* Navigate from address bar re-mount the App */

  if (localStorage.getItem('user')) {
    return <Navigate to='/inventory' replace />
  }

  return children
}

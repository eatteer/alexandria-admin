import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RequireAuth } from './router/RequireAuth'
import { SignIn } from './pages/SignIn'
import { Inventory } from './pages/Inventory'
import { Reports } from './pages/Reports'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './redux/user/actions'
import { User } from './entities/User'
import { AvoidNavigateIfUser } from './router/AvoidNavigateIfUser'

function App() {
  const user = useSelector<any, any>((store) => store.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const rawUser = localStorage.getItem('user')
    if (rawUser) {
      const user = JSON.parse(rawUser) as User
      dispatch(login(user))
    }
  }, [])

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <AvoidNavigateIfUser>
              <SignIn />
            </AvoidNavigateIfUser>
          }
        />
        <Route
          path='/inventory'
          element={
            <RequireAuth>
              <Inventory />
            </RequireAuth>
          }
        />
        <Route
          path='/reports'
          element={
            <RequireAuth>
              <Reports />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App

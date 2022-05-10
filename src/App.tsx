import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RequireAuth } from './router/RequireAuth'
import { SignIn } from './pages/SignIn'
import { Inventory } from './pages/Inventory'
import { Reports } from './pages/Reports'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
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

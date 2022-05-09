import { Route, Routes } from 'react-router-dom'
import { Inventory } from './pages/Inventory'
import { SignIn } from './pages/SignIn'

function App() {
  return (
    <div className=''>
      <Routes>
        <Route path='signin' element={<SignIn />} />
        <Route path='inventory' element={<Inventory />} />
      </Routes>
    </div>
  )
}

export default App

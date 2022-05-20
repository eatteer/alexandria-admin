import { IoMdLogOut } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/user/actions'

export const Topbar: React.FC = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className='top-bar justify-between'>
      <div className='flex items-center'>
        {/* <h2 className='text-3xl font-[Cinzel] font-bold mr-8'>Alexandria</h2> */}
        <NavLink
          className={({ isActive }) =>
            `p-2 font-medium border-b-2 ${
              isActive ? 'border-blue-700' : 'border-transparent'
            }`
          }
          to='/inventory'
        >
          Inventory
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `p-2 font-medium border-b-2 ${
              isActive ? 'border-blue-700' : 'border-transparent'
            }`
          }
          to='/reports'
        >
          Reports
        </NavLink>
      </div>
      <button className='button button-primary' onClick={handleLogout}>
        Logout
        <span>
          <IoMdLogOut size={24} />
        </span>
      </button>
    </nav>
  )
}

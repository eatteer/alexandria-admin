import { IoMdLogOut } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

export const Topbar: React.FC = () => {
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
      <button className='button button-primary'>
        Logout
        <span>
          <IoMdLogOut size={24} />
        </span>
      </button>
    </nav>
  )
}

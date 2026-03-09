import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              TwistLook
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/land" className="text-gray-600 hover:text-primary-600">
                Land
              </Link>
              <Link to="/construction" className="text-gray-600 hover:text-primary-600">
                Construction
              </Link>
              <Link to="/search" className="text-gray-600 hover:text-primary-600">
                Search
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/post" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Post Listing
                </Link>
                <Link to="/messages" className="text-gray-600 hover:text-primary-600">
                  Messages
                </Link>
                <Link to={`/profile/${user.id}`} className="text-gray-600 hover:text-primary-600">
                  Profile
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

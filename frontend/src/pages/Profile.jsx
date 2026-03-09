import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { users } from '../services/api'
import { useAuth } from '../context/AuthContext'
import PropertyGrid from '../components/PropertyGrid'

export default function Profile() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => users.getUser(id).then(res => res.data)
  })

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ['userListings', id],
    queryFn: () => users.getUserListings(id).then(res => res.data)
  })

  if (userLoading) return <div className="text-center py-12">Loading...</div>
  if (!user) return <div className="text-center py-12">User not found</div>

  const isOwnProfile = currentUser?.id === id

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-4xl text-primary-600 font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            {user.phone && <p className="text-gray-500">{user.phone}</p>}
            {(user.city || user.state) && (
              <p className="text-gray-500">
                {[user.city, user.state].filter(Boolean).join(', ')}
              </p>
            )}
            {user.createdAt && (
              <p className="text-gray-400 text-sm mt-2">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
          {isOwnProfile && (
            <button className="text-primary-600 hover:text-primary-700">
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* User Listings */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isOwnProfile ? 'My Listings' : `${user.name}'s Listings`}
        </h2>

        {listingsLoading ? (
          <div className="text-center py-8">Loading listings...</div>
        ) : (
          <>
            {listings?.land?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Land Sites</h3>
                <PropertyGrid properties={listings.land} type="land" />
              </div>
            )}

            {listings?.construction?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Construction Sites</h3>
                <PropertyGrid properties={listings.construction} type="construction" />
              </div>
            )}

            {(!listings?.land?.length && !listings?.construction?.length) && (
              <div className="text-center py-8 text-gray-500">
                No listings yet
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

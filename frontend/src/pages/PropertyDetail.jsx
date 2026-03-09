import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { properties } from '../services/api'
import { useAuth } from '../context/AuthContext'
import ReviewSection from '../components/ReviewSection'

export default function PropertyDetail() {
  const { type, id } = useParams()
  const { user } = useAuth()

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', type, id],
    queryFn: () => {
      if (type === 'land') return properties.getLandById(id).then(res => res.data)
      return properties.getConstructionById(id).then(res => res.data)
    }
  })

  if (isLoading) return <div className="text-center py-12">Loading...</div>
  if (error || !property) return <div className="text-center py-12 text-red-500">Property not found</div>

  // Handle both legacy and new field names
  const imageId = property.IMAGE1
  const mainImage = imageId ? `/api/images/${imageId}` : 'https://via.placeholder.com/800x400?text=No+Image'
  const images = [property.IMAGE1, property.IMAGE2].filter(Boolean)

  const title = property.NAME || property.TYPE || property.title || 'Property'
  const location = property.LOCATION || property.location || ''
  const description = property.DESCRIPTION || property.description || ''
  const price = property.MIN_PRICE || property.MAX_PRICE || property.price
  const maxPrice = property.MAX_PRICE
  const area = property.AREA || property.area
  const features = property.FEATURES ? property.FEATURES.split(', ') : []
  const rating = property.RATING || 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="mb-8">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-96 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400?text=No+Image'
          }}
        />
        {images.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {images.map((img, i) => (
              <img
                key={i}
                src={`/api/images/${img}`}
                alt={`${title} ${i + 1}`}
                className="w-24 h-24 object-cover rounded cursor-pointer"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm capitalize">
                {type}
              </span>
              {rating > 0 && (
                <span className="ml-2 text-yellow-500">
                  {'★'.repeat(Math.round(rating / 20))}
                  <span className="text-gray-500 text-sm ml-1">({rating})</span>
                </span>
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">{title}</h1>
          <p className="text-gray-500 text-lg mt-1">{location}</p>

          <div className="text-3xl font-bold text-primary-600 mt-4">
            {price ? `$${price.toLocaleString()}` : 'Price on Request'}
            {maxPrice && price !== maxPrice && (
              <span className="text-lg text-gray-500 font-normal ml-2">
                - ${maxPrice.toLocaleString()}
              </span>
            )}
          </div>

          {description && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{description}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, i) => (
                  <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4">
            {area && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Area</div>
                <div className="text-lg font-semibold">{area.toLocaleString()} sqft</div>
              </div>
            )}
            {type === 'construction' && property.START_DATE && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Start Date</div>
                <div className="text-lg font-semibold">{property.START_DATE}</div>
              </div>
            )}
            {type === 'construction' && property.END_DATE && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">End Date</div>
                <div className="text-lg font-semibold">{property.END_DATE}</div>
              </div>
            )}
            {type === 'land' && property.POSSESSION_DATE && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Possession Date</div>
                <div className="text-lg font-semibold">{property.POSSESSION_DATE}</div>
              </div>
            )}
            {property.FREEHOLD && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Ownership</div>
                <div className="text-lg font-semibold">{property.FREEHOLD}</div>
              </div>
            )}
            {property.DATE && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm">Posted On</div>
                <div className="text-lg font-semibold">{property.DATE}</div>
              </div>
            )}
          </div>

          <ReviewSection propertyId={id} propertyType={type} />
        </div>

        {/* Contact Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Contact Details</h3>

            {property.POSTED_BY && (
              <div className="mb-3">
                <div className="text-gray-500 text-sm">Posted By</div>
                <div className="font-medium">{property.POSTED_BY.split('@')[0]}</div>
              </div>
            )}

            {type === 'land' && property.OWNER_FIRST_NAME && (
              <div className="mb-3">
                <div className="text-gray-500 text-sm">Owner</div>
                <div className="font-medium">
                  {property.OWNER_FIRST_NAME} {property.OWNER_LAST_NAME}
                </div>
              </div>
            )}

            {(property.OWNER_MOBILE || property.OWNER_EMAIL) && (
              <div className="mb-3">
                <div className="text-gray-500 text-sm">Contact</div>
                <div className="font-medium">{property.OWNER_MOBILE || property.OWNER_EMAIL}</div>
              </div>
            )}

            {!user && (
              <Link
                to="/login"
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg hover:bg-primary-700 mt-4"
              >
                Login to Contact
              </Link>
            )}

            {user && (
              <button
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg hover:bg-primary-700 mt-4"
                onClick={() => alert('Contact feature - would send message to owner')}
              >
                Contact Owner
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

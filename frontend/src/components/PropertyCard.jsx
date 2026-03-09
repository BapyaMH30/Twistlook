import { Link } from 'react-router-dom'

export default function PropertyCard({ property, type }) {
  // Handle both legacy (UPPERCASE) and new (lowercase) field names
  const imageId = property.IMAGE1 || property.images?.[0]
  const imageUrl = imageId
    ? `/api/images/${imageId}`
    : 'https://via.placeholder.com/400x300?text=No+Image'

  const title = property.NAME || property.TYPE || property.title || 'Property'
  const location = property.LOCATION || property.location || property.city || ''
  const price = property.MIN_PRICE || property.MAX_PRICE || property.price
  const area = property.AREA || property.area

  return (
    <Link to={`/property/${type}/${property._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
            }}
          />
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-sm">
            {type === 'land' ? 'Land' : 'Construction'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 truncate">{title}</h3>
          <p className="text-gray-500 text-sm truncate">{location}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-primary-600 font-bold">
              {price ? `$${price.toLocaleString()}` : 'Price on Request'}
            </span>
            {area && (
              <span className="text-gray-500 text-sm">
                {area.toLocaleString()} sqft
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

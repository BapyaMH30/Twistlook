import PropertyCard from './PropertyCard'

export default function PropertyGrid({ properties, type }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No properties found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          type={type || property.propertyType}
        />
      ))}
    </div>
  )
}

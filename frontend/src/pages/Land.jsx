import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { properties } from '../services/api'
import PropertyGrid from '../components/PropertyGrid'

export default function Land() {
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  })

  const { data, isLoading } = useQuery({
    queryKey: ['land', filters],
    queryFn: () => properties.getLand(filters).then(res => res.data)
  })

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Land Sites</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <PropertyGrid properties={data} type="land" />
      )}
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ initialValues = {} }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState(initialValues.q || '')
  const [type, setType] = useState(initialValues.type || '')
  const [city, setCity] = useState(initialValues.city || '')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (type) params.set('type', type)
    if (city) params.set('city', city)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search properties..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">All Types</option>
          <option value="land">Land</option>
          <option value="construction">Construction</option>
        </select>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
        >
          Search
        </button>
      </div>
    </form>
  )
}

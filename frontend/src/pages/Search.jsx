import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { properties } from '../services/api'
import PropertyGrid from '../components/PropertyGrid'
import SearchBar from '../components/SearchBar'

export default function Search() {
  const [searchParams] = useSearchParams()

  const q = searchParams.get('q') || ''
  const type = searchParams.get('type') || ''
  const city = searchParams.get('city') || ''

  const { data, isLoading } = useQuery({
    queryKey: ['search', q, type, city],
    queryFn: () => properties.search({ q, type, city }).then(res => res.data)
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Properties</h1>

      <div className="mb-8">
        <SearchBar initialValues={{ q, type, city }} />
      </div>

      {q || type || city ? (
        <p className="text-gray-500 mb-4">
          {data?.length || 0} results found
          {q && ` for "${q}"`}
          {type && ` in ${type}`}
          {city && ` near ${city}`}
        </p>
      ) : null}

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <PropertyGrid properties={data} />
      )}
    </div>
  )
}

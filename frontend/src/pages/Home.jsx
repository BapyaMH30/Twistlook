import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { properties } from '../services/api'
import PropertyGrid from '../components/PropertyGrid'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const { data: landData, isLoading: landLoading } = useQuery({
    queryKey: ['land', 'featured'],
    queryFn: () => properties.getLand({ limit: 4 }).then(res => res.data)
  })

  const { data: constructionData, isLoading: constructionLoading } = useQuery({
    queryKey: ['construction', 'featured'],
    queryFn: () => properties.getConstruction({ limit: 4 }).then(res => res.data)
  })

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            Discover land and construction sites across the country
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Featured Land */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Land Sites</h2>
          <Link to="/land" className="text-primary-600 hover:text-primary-700">
            View All →
          </Link>
        </div>
        {landLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <PropertyGrid properties={landData?.slice(0, 4)} type="land" />
        )}
      </div>

      {/* Featured Construction */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Construction Sites</h2>
            <Link to="/construction" className="text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>
          {constructionLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <PropertyGrid properties={constructionData?.slice(0, 4)} type="construction" />
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to List Your Property?
        </h2>
        <p className="text-gray-600 mb-6">
          Reach thousands of potential buyers by listing your property today
        </p>
        <Link
          to="/post"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700"
        >
          Post a Listing
        </Link>
      </div>
    </div>
  )
}

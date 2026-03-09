import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { properties } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function PostListing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [type, setType] = useState('land')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    area: '',
    areaUnit: 'sqft',
    location: '',
    city: '',
    state: '',
    pincode: '',
    ownerName: '',
    ownerContact: '',
    constructorName: '',
    constructorContact: '',
    projectType: '',
    completionDate: ''
  })
  const [error, setError] = useState('')

  const mutation = useMutation({
    mutationFn: (data) => {
      if (type === 'land') {
        return properties.createLand(data)
      }
      return properties.createConstruction(data)
    },
    onSuccess: (res) => {
      navigate(`/property/${type}/${res.data._id}`)
    },
    onError: (err) => {
      setError(err.response?.data?.error || 'Failed to create listing')
    }
  })

  if (!user) return <Navigate to="/login" />

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const data = {
      ...formData,
      price: formData.price ? Number(formData.price) : undefined,
      area: formData.area ? Number(formData.area) : undefined
    }

    // Remove empty fields
    Object.keys(data).forEach((key) => {
      if (data[key] === '' || data[key] === undefined) delete data[key]
    })

    mutation.mutate(data)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a Listing</h1>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Type Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Property Type</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setType('land')}
              className={`px-6 py-2 rounded-lg ${
                type === 'land'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Land
            </button>
            <button
              type="button"
              onClick={() => setType('construction')}
              className={`px-6 py-2 rounded-lg ${
                type === 'construction'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Construction
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Area
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="sqft">sqft</option>
                  <option value="sqm">sqm</option>
                  <option value="acres">acres</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Location/Address
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Type-specific fields */}
          {type === 'land' ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Owner Contact
                </label>
                <input
                  type="text"
                  name="ownerContact"
                  value={formData.ownerContact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Constructor Name
                  </label>
                  <input
                    type="text"
                    name="constructorName"
                    value={formData.constructorName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Constructor Contact
                  </label>
                  <input
                    type="text"
                    name="constructorContact"
                    value={formData.constructorContact}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {mutation.isPending ? 'Creating...' : 'Create Listing'}
          </button>
        </form>
      </div>
    </div>
  )
}

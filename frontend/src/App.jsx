import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Land from './pages/Land'
import Construction from './pages/Construction'
import PropertyDetail from './pages/PropertyDetail'
import Search from './pages/Search'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import PostListing from './pages/PostListing'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/land" element={<Land />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/property/:type/:id" element={<PropertyDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:userId" element={<Messages />} />
          <Route path="/post" element={<PostListing />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

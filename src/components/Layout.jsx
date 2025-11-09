import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar/Navbar'
import FooterPage from '../pages/FooterPage'
import Home from './Home/Home'


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="w-full shadow-sm">
        <Navbar />
      </nav>

      {/* Main content area */}
      <main className="flex-grow max-w-[1200px] w-full mx-auto px-4 py-8">
        <Outlet />
    
      </main>

      {/* Footer */}
      <FooterPage />
    </div>
  )
}

export default Layout

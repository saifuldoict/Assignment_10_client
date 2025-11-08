import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar/Navbar'


const Layout = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout

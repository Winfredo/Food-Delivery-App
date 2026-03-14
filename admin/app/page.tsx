import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'


const page = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className='app-content flex'>
        <Sidebar />
      </div>
      
    </div>
  )
}

export default page

import React from 'react'

const Navbar = () => {
  return (
   <div 
  className='w-full h-20 flex items-center justify-between px-8 py-4 '>
  <img src="/assets/logo.png" alt='Logo' className='w-20 md:w-[13%] ' />
  <img src="/assets/profile_image.png" alt='Profile picture' className=' w-10' />
</div>
  )
}

export default Navbar

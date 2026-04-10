import React from 'react'
import Link from "next/link";
const Navbar = () => {
  return (
  <div className='w-full h-20 flex items-center justify-between px-8 py-7 mb-4'>
  <Link href="/" className="flex items-center">
    <img src="/assets/logo.png" alt='Logo' className='w-20 md:w-32 lg:w-40' />
  </Link>
  <img src="/assets/profile_image.png" alt='Profile picture' className='w-10 h-10 rounded-full' />
</div>
  )
}

export default Navbar

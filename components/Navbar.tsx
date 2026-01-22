import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
      <Image src="/assets/logo.png" alt="Logo" width={200} height={200}  />

      <ul>
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
         <li>Contact Us</li>
      </ul>

      <div>
        <Image src="/assets/search_icon.png" alt="Search" width={30} height={30} />
        <Image src="/assets/basket_icon.png" alt="Cart" width={30} height={30} />
        <button className='bg-red-200'>Login</button>
      </div>
    </div>
  )
}

export default Navbar


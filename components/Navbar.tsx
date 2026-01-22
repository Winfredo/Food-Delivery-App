import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div>
      <p>This is the Navbar.</p>
      <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
    </div>
  )
}

export default Navbar


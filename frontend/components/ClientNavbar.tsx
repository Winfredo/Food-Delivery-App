"use client"
import React, { useState } from 'react'
import Navbar from './Navbar';
import LoginPopup from './LoginPopup';

const ClientNavbar = () => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
  return (
    
    <div>
      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}
      <Navbar setShowLoginPopup={setShowLoginPopup} />
    </div>
  )
}

export default ClientNavbar

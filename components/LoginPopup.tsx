import React, { useState } from 'react'

const LoginPopup = () => {

    const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <div className=''>
      <form>
        <div>
            <h2>{currentState}</h2>
            <img src="/assets/cross_icon.png" alt="cross icon" />
        </div>
      </form>
    </div>
  )
}

export default LoginPopup

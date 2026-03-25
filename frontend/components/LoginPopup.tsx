"use client";
import React, { useState, useContext } from "react";
import { LoginPopupProps } from "@/types/type";
import { storeContext } from "@/context/StoreContextProvider";
import axios from "axios";
 

const LoginPopup = ({ setShowLoginPopup }: LoginPopupProps) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const {url,token, setToken} = useContext(storeContext)!;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const onLogin = async (e:any) => {
    e.preventDefault();
    let newUrl = url + (currentState === "Login" ? "/api/user/login" : "/api/user/signup");
    
    const response = await axios.post(newUrl, formData);
    
    if(response.data.success){
      console.log(response.data);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLoginPopup(false);
    }else {
      alert(response.data.message);
    }
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev)=> ({...prev, [name]: value}))
  }
  return (
    <div className="fixed inset-0 bg-[#00000090] bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={onLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">{currentState}</h2>
    <img
      src="/assets/cross_icon.png"
      alt="cross icon"
      onClick={() => setShowLoginPopup(false)}
      className="cursor-pointer w-4 h-4 hover:opacity-70 transition-opacity"
    />
  </div>
  
  <div className="space-y-3">
    {currentState === "Login" ? (
      <></>
    ) : (
      <input 
        type="text" 
        name="name"
        value={formData.name}
        onChange={onChangeHandler}
        placeholder="Your name" 
        required 
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FF6347] focus:ring-1 focus:ring-[#FF6347] text-sm"
      />
    )}
    <input 
      type="text" 
      name="email"
      value={formData.email}
      onChange={onChangeHandler}
      placeholder="Your email" 
      required 
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FF6347] focus:ring-1 focus:ring-[#FF6347] text-sm"
    />
    <input 
      type="password" 
      name="password"
      value={formData.password}
      onChange={onChangeHandler}
      placeholder="Password" 
      required 
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FF6347] focus:ring-1 focus:ring-[#FF6347] text-sm"
    />
  </div>
  
  <button type="submit" className="w-full mt-4 cursor-pointer bg-[#FF6347] hover:bg-[#e5533d] text-white py-2 rounded transition-colors text-sm font-medium">
    {currentState === "Sign Up" ? "Create Account" : "Login"}
  </button>
  
  {currentState === "Sign Up" && (
    <div className="flex items-start gap-2 mt-3">
      <input type="checkbox" required className="mt-1 w-3.5 h-3.5 accent-[#FF6347]" />
      <p className="text-xs text-gray-600">By accepting, you agree to our terms and conditions</p>
    </div>
  )}
  
  {currentState === "Login" ? (
    <p className="mt-4 text-xs text-center text-gray-600">
      Create a new account?
      <span
        className="text-[#FF6347] cursor-pointer hover:underline ml-1"
        onClick={() => setCurrentState("Sign Up")}
      >
        Click here
      </span>
    </p>
  ) : (
    <p className="mt-4 text-xs text-center text-gray-600">
      Already have an account?
      <span
        className="text-[#FF6347] cursor-pointer hover:underline ml-1"
        onClick={() => setCurrentState("Login")}
      >
        Login here
      </span>
    </p>
  )}
</form>
    </div>
  );
};

export default LoginPopup;

 
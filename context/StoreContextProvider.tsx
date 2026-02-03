"use client";
import React,{createContext} from 'react'
import {foodList} from "@/constants/constants"
export const storeContext = createContext<StoreContextType | null>(null)
type StoreContextType = {
    foodList: any[]; 
}
const StoreContextProvider = (props:any) => {
    
    const storeValue:StoreContextType = {
         foodList: foodList
    }

    return (
        <storeContext.Provider value={storeValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider



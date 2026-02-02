import React,{createContext} from 'react'

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    
    const storeValue = {

    }

    return (
        <storeContext.Provider value={storeValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider



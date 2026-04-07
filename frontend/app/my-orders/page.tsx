import { storeContext } from '@/context/StoreContextProvider';
import React, { useContext } from 'react'
import axios from 'axios';
const page = () => {
  const {url, token} = useContext(storeContext)!;
  const [data, setData] = React.useState([]);

 
  return (
    <div>
      
    </div>
  )
}

export default page

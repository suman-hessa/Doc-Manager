import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { loadDocuments } from './store/docSlice.js'
import { apiServices } from './apiHandler/conf.js'
import { authServices } from './apiHandler/auth.js'
import {logout, login as storeLogin, logout as storeLogout } from './store/authSlice.js'

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector(state=>state.auth.status)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(()=>{
    authServices.getCurrentUser().then(data=>{
      if(data?.data !== null){
        dispatch(storeLogin(data.data))
      }else{
        dispatch(logout())
      }
    }).catch(error=>{
      console.error("Auth check failed: ", error)
      dispatch(logout())
    }).finally(()=>setIsCheckingAuth(false))
  }, [])

  useEffect(()=>{
          if (authStatus === true) {
        apiServices.getAllDocuments()
      .then((docs) => dispatch(loadDocuments(docs)))
      .catch((err) => console.log("Failed to fetch documents", err));
  }
  }, [authStatus])

  if(isCheckingAuth){
    return <div>Loading...</div>
  }
  return (
    <div className='w-full'>
      <Outlet/>
    </div>
  )
}

export default App

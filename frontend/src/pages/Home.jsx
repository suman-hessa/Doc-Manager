import React from 'react'
import { useSelector } from 'react-redux'
import { Container, ReactHotToast } from '../components'
import {Button} from '../components'
import { useNavigate } from 'react-router'
import {Plus} from 'lucide-react'

function Home() {
  const {authStatus, userData} = useSelector(state=>state.auth);
  const navigate = useNavigate()

  if(authStatus || userData === null){
    return <div>Loading...</div>
  }
  return (
    <div className='mx-8 my-4 relative'>
      {console.log({userData})}
      <h1 className='text-center my-4 text-lg font-medium'>Q-SE ELECTRICAL MAINTENANCE</h1>
      <div className='flex flex-col gap-6'>
        <Button
         bgColor="bg-gray-100"
         textColor="text-gray-800"
         className='px-4 py-4 rounded-sm text-left pl-10 shadow-md border border-gray-300 hover:bg-white text-md font-medium'
         onClick={()=>navigate("/sop")}
        >SOP</Button>
        <Button
         bgColor="bg-gray-100"
         textColor="text-gray-800"
         className='px-4 py-4 rounded-sm text-left pl-10 shadow-md border border-gray-300 hover:bg-white text-md font-medium'
         onClick={()=>navigate("/hira")}
        >HIRA</Button>
      </div>
      {userData.role === 'ADMIN' && <Button
        className='fixed bottom-20 right-12.5 rounded-full size-18 inline-flex justify-center items-center text-white hover:bg-blue-500'
        onClick={()=>navigate("/add-docs")}
       ><Plus size={40}/></Button>}
    </div>
  )
}

export default Home

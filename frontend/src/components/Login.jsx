import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {CircleUserRound} from 'lucide-react'
import {Input, Button} from './index.js'
import {authServices} from '../apiHandler/auth.js'
import { useDispatch } from 'react-redux'
import {login as storeLogin} from '../store/authSlice.js'
import { useNavigate } from 'react-router'
import toast, {Toaster} from 'react-hot-toast'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const loginUser = async (data)=>{
      setError("")
      try {
        const session = await authServices.login(data);
        if(session?.success){
          const userData = await authServices.getCurrentUser()
          if(userData){
            dispatch(storeLogin(userData.data));
            toast.success('user logged in')
            setTimeout(()=>{
              navigate("/")
            }, 1000)
            
          }
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      }
    }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center px-8 py-4'>
        <CircleUserRound 
        strokeWidth={1}
        size={100}
         className='text-blue-300'/>
         {/* {error && <h3 className='text-red-500 tex-md my-2'>{`${error}`}</h3>} */}
         <form 
         onSubmit={handleSubmit(loginUser)}
         className='flex w-full flex-col gap-4 mb-4'>
            <Input
             label='username'
             className='shadow-xs'
             {...register("username", {required: true})}
            />
            <Input
             label='password'
             className='shadow-xs'
             {...register("password", {required: true})}
            />
            <Button
             className='px-4 py-2 rounded-md text-white uppercase hover:bg-blue-500'
             type='submit'
            >Login</Button>
         </form>
         <Toaster/>
    </div>
  )
}

export default Login

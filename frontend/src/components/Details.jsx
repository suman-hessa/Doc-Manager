import React from 'react'
import {Button} from '../components'
import { useNavigate, Link } from 'react-router'

function Details({_id, title, effectiveDate, expiryDate, description,file}) {

  const navigate = useNavigate()
  return (
    <div className='w-full p-4 space-y-2'>
      <h1 className='text-2xl font-bold uppercase text-gray-700'>{title}</h1>
      <h1 className='text-xl font-medium uppercase text-gray-700'><span className='uppercase font-bold text-xl mr-1'>EFFECTIVE DATE :</span>{effectiveDate}</h1>
      <h1 className='text-xl font-medium uppercase text-gray-700'><span className='uppercase font-bold text-xl mr-1'>EXPIRY DATE :</span>{expiryDate}</h1>
      <h1 className='text-xl font-medium uppercase text-gray-700'><span className='uppercase font-bold text-xl mr-1'>DESCRIPTION :</span>{description}</h1>
      <Link to={file}>
        <Button
        className='w-full uppercase py-1.5 rounded-lg text-white hover:bg-blue-500'
      >View sop</Button>
      </Link>
    </div>
  )
}

export default Details

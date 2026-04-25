import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router'
import {Button} from './index.js'
import { SquarePen, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';

function DocsCard({_id, title, effectiveDate, expiryDate, file, documentType}) {
  const userData = useSelector(state=>state.auth.userData)
  const navigate = useNavigate()
  const [effDate, setEffDate] = useState('')
  const[expDate, setExpDate] = useState('')

  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

  const formatDate = useCallback((date)=>{
    const dateArr = date.split("T")[0].split("-");
    const year = dateArr[0];
    const monthNum = dateArr[1].split("")[1];
    const month = months[monthNum-1]
    const day = dateArr[2];

    return `${day} ${month}, ${year}`
  }, [])

  useEffect(()=>{
    setEffDate(formatDate(effectiveDate))
    setExpDate(formatDate(expiryDate))
  }, [])

  return (
    <div
    className='space-y-1 text-md font-medium border border-gray-300 shadow-md px-2 py-2 cursor-pointer relative'>
      <h1 className='font-bold uppercase text-gray-800'>{title}</h1>
      <h1 className='text-md font-medium uppercase text-gray-900'><span className='uppercase font-bold text-md mr-1 text-gray-800'>EFF DATE :</span>{effDate}</h1>
      <h1 className='text-md font-medium uppercase text-gray-900'><span className='uppercase font-bold text-md mr-1 text-gray-800'>EXP DATE :</span>{expDate}</h1>
      <Link to={file}>
        <Button
          bgColor={'bg-blue-400'}
          textColor={'text-white'}
          className='py-1.5 rounded-xs uppercase text-sm hover:bg-blue-500'
        >{`View ${documentType}`}</Button>
      </Link>
      {userData.role === 'ADMIN' && <div className='absolute right-6 bottom-12 space-x-4'>
        <button 
         onClick={()=>navigate(`/edit-docs/${_id}`)}
        className='bg-green-300 hover:bg-green-400 cursor-pointer rounded-md p-2'><SquarePen /></button>
        <button className='bg-red-300 rounded-md p-2 hover:bg-red-400 cursor-pointer'
        onClick={()=>navigate(`/delete-docs/${_id}`)}
        ><Trash2 /></button>
      </div>}
    </div>
  )
}

export default DocsCard

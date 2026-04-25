import React, { useEffect, useState, useMemo } from 'react'
import { Button, DocsCard } from '../components'
import { apiServices } from '../apiHandler/conf'
import { useSelector } from 'react-redux'

function Hira() {
  const documents = useSelector(state=>state.docs.documents);
    const hiras = useMemo(()=>documents.filter(doc=>doc.documentType === 'HIRA'), [documents])
    const activeHiras = useMemo(()=>hiras.filter(hira=>hira.hasExpired == false), [hiras])
    const expiredHiras = useMemo(()=>hiras.filter(hira=>hira.hasExpired == true), [hiras])
    
  const[status, setStatus]= useState('active');

  if(!hiras){
    return <div>Loading...</div>
  }
  return (
    <div className='px-8 py-4'>
      <h1 className='text-center text-lg font-medium mb-4'>HIRA</h1>
      <div className='w-full flex justify-evenly mb-4 gap-4'>
              <Button
               bgColor={status=='active'? "bg-green-500 text-white": "bg-white border-gray-300 border"}
               className='rounded-sm w-full py-2 text-md font-medium uppercase'
               onClick={()=>setStatus('active')}
              >Active</Button>
              <Button
               className={`${status=='expired'? "bg-red-500 text-white": "text-gray-800 bg-white border-gray-300 border"} rounded-sm w-full py-2 text-md font-medium  uppercase`}
               onClick={()=>setStatus('expired')}
              >Expired</Button>
            </div>
            {status === 'active'? <div className='space-y-4'>
              {activeHiras.map(hira=>(
              <DocsCard key={hira._id} _id={hira._id} title={hira.title} effectiveDate={hira.effectiveDate} expiryDate={hira.expiryDate} file={hira.file} documentType={hira.documentType}/>
            ))}
            </div>: 
            <div className='space-y-4'>
              {expiredHiras.map(hira=>(
              <DocsCard key={hira._id} _id={hira._id} title={hira.title} effectiveDate={hira.effectiveDate} expiryDate={hira.expiryDate} file={hira.file} documentType={hira.documentType}/>
            ))}
            </div>}
          
    </div>
  )
}

export default Hira
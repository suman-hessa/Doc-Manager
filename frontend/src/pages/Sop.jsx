import React, { useEffect, useState, useMemo } from 'react'
import { Button, DocsCard } from '../components'
import { useSelector } from 'react-redux'


function Sop() {
  const documents = useSelector(state=>state.docs.documents);
  const sops = useMemo(()=>documents.filter(doc=>doc.documentType === 'SOP')
  , [documents])
  const activeSops = useMemo(()=>sops.filter(sop=>sop.hasExpired == false), [sops])
  const expiredSops = useMemo(()=>sops.filter(sop=>sop.hasExpired == true), [sops])
  const[status, setStatus] = useState('active');
  
  if(!sops){
    return <div>Loading...</div>
  }
  return (
    <div className='px-8 py-4'>
      <h1 className='text-center text-lg font-medium mb-4'>SOP</h1>
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
        {activeSops.map(sop=>(
        <DocsCard key={sop._id} _id={sop._id} title={sop.title} effectiveDate={sop.effectiveDate} expiryDate={sop.expiryDate} file={sop.file} documentType={sop.documentType}/>
      ))}
      </div>: <div className='space-y-4'>
        {expiredSops.map(sop=>(
        <DocsCard key={sop._id} _id={sop._id} title={sop.title} effectiveDate={sop.effectiveDate} expiryDate={sop.expiryDate} file={sop.file} documentType={sop.documentType}/>
      ))}
      </div>}
    </div>
  )
}

export default Sop

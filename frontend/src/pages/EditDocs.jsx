import React, { useEffect, useState } from 'react'
import { Form } from '../components'
import { useParams } from 'react-router'
import { apiServices } from '../apiHandler/conf.js'

function EditDocs() {
    const params = useParams()
    const [doc, setDoc] = useState('');

    useEffect(()=>{
        apiServices.getDocumentById(params.documentId).then(data=>setDoc(data.data))
    }, [])

    if(!doc){
        return <div>Loading...</div>
    }
  return (
    <div>
      <Form document={doc}/>
    </div>
  )
}

export default EditDocs

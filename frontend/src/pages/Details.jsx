import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { apiServices } from '../apiHandler/conf'
import {Details as DetailsComponent, Container} from '../components'

function Details() {
  const params = useParams()
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    apiServices.getDocumentById(params.documentId).then(data=>setData(data.data))
  }, [params])

  if(!loader){
    return(<div>Loading...</div>)
  }else{
    return (
    <Container>
    <div>
       <DetailsComponent _id={data._id} title={data.title} description={data.description} effectiveDate={data.effectiveDate} expiryDate={data.expiryDate} file={data.file}/>
    </div>
    </Container>
  )
  }
  
}

export default Details

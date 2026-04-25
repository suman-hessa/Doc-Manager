import React, { useEffect, useState } from 'react'
import { Container, PdfViewer as PdfViewerComponent } from '../components'
import { apiServices } from '../apiHandler/conf.js'
import { useParams } from 'react-router'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function PdfViewer() {
    const params = useParams()
    const [pdf, setPdf] = useState('')
    const [loader, setLoader] = useState(false);
    useEffect(()=>{
        setLoader(true)
        apiServices.getDocumentById(params.documentId).then(data=>setPdf(data.data)).then(()=>setLoader(false))
    }, [params])
  if(loader){
    return <div>Loading...</div>
  }
  return (
   <Container>
    <PdfViewerComponent file={pdf.file} title={pdf.title}/>
   </Container> 
  )
}

export default PdfViewer

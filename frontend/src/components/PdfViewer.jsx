import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfViewer(file) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  console.log(file)

  const onDocumentLoadSuccess = ({numPages})=> setNumPages(numPages)
 
  if(!file){
    return <div>Loading file...</div>
  }
  return (
    <div className='p-12.5 mt-12.5 bg-gray-400'>
        <h1 className='text-center uppercase text-2xl text-white font-bold'>{file.title}</h1>
        <Document 
        className={'flex flex-col w-full items-center'}
      file={file.file}
      loading="pdf load ho raha..."
      error="Failed to load PDF."
      onLoadSuccess={onDocumentLoadSuccess}
      >
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
        <div key={page}>
          <p className='mb-1.5 text-lg uppercase font-semibold text-white'>
            Page {page} of {numPages}
          </p>
          <Page
            className="mb-4 border"
            renderTextLayer={false}
            renderAnnotationLayer={false}
            pageNumber={page} 
          />
        </div>
      ))}
      </Document>  
    </div>
  );
}

export default PdfViewer;
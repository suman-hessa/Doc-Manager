import React, {useState} from 'react'
import { Button } from '../components'
import { CircleAlert } from 'lucide-react'
import { useParams } from 'react-router'
import { apiServices } from '../apiHandler/conf'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { deleteDocument as storeDelete } from '../store/docSlice.js' 

function Delete() {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const deleteDoc = async (documentId)=>{ try {
            setError("")
            console.log(documentId)
            const doc = await apiServices.deleteDocumentById(documentId);
            if(doc){
                toast.success(doc?.message);
                dispatch(storeDelete(documentId))
                setTimeout(()=>{
                    navigate("/", {replace: true})
                }, 1000)  
            }
    } catch (error) {
        setError(error?.message);
        toast.error(error?.message || "something went wrong")
        setTimeout(()=>{
            navigate("/")
        }, 1000)
    }
    }
  return (
    <div className='h-screen w-screen  flex justify-center items-center'>
      <div className='border w-full max-w-sm min-h-51 rounded-sm p-4 flex flex-col items-center justify-center gap-4'>
        <CircleAlert size={48} className='text-red-400'/>
      <h1 className='text-center text-lg uppercase max-w-xs font-semibold'>Confirm to delete this document?</h1>
      <div className='space-x-8'>
        <Button 
         className='bg-green-400 text-white py-1.5 rounded-sm hover:bg-green-500 uppercase'
         onClick={()=>navigate("/")}
        >Cancel</Button>
        <Button
         className='bg-red-400 text-white py-1.5 rounded-sm hover:bg-red-500 uppercase'
         onClick={()=>deleteDoc(params.documentId)}
        >Delete</Button>
      </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default Delete

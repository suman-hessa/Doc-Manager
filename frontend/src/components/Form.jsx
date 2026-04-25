import React, { useState } from 'react'
import {Button, Container, Input, Select} from './index.js'
import {useForm} from 'react-hook-form'
import { apiServices } from '../apiHandler/conf.js';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router';
import { Eye } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {addSingleDocument, updateDocument} from '../store/docSlice.js';

function Form({document}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, getValues, setValue} = useForm({
        defaultValues: {
            title: document?.title || '',
            description: document?.description || '',
            effectiveDate: document?.effectiveDate? document.effectiveDate.split("T")[0]: '',
            expiryDate: document?.expiryDate? document.expiryDate.split("T")[0]: '',
            documentType: document?.documentType || ''
        }
    })
    const submit = (data)=>{
      console.log({data});
        if(document){
            console.log(data, document?._id)
            apiServices.updateDocument(document?._id, data).then(data=>{
              if(data){
                toast.success("document updated")
                dispatch(updateDocument({data}))
                setTimeout(()=>{navigate(`/${data.documentType.toLowerCase()}`, {replace: true})}, 1000)
              }
            })
        }else{
           console.log("i am here")
            apiServices.createDocument(data).then(data=>{
              toast.success(data.message)
              dispatch(addSingleDocument({data: data.data}))
              setTimeout(()=>{navigate(`/${data.data.documentType.toLowerCase()}`, {replace: true}) }, 1000)
            })
            }
        }

    
  return (
    <Container>
      <h1 className='text-center font-bold uppercase text-xl'>Add Documents</h1>
      <form className='mt-4 space-y-4' onSubmit={handleSubmit(submit)} >
        <Input
          label='TITLE'
          className='rounded-md text-md'
          {...register("title", {required: true})}
        />
        <Input
          label='DESCRIPTION'
          className='rounded-md text-md'
          {...register("description", {required: true})}
        />
        <Input
         type='Date'
         label='EFFECTIVE DATE'
         className='uppercase'
         {...register("effectiveDate", {required: true})}
         defaultValue={getValues('effectiveDate')}
        />
        <Input
         type='Date'
         label='EXPIRY DATE'
         className='uppercase'
         {...register("expiryDate", {required: true})}
         defaultValue={getValues("expiryDate")}
        />
        <div className='flex border pr-4 rounded-lg border-gray-300 cursor-pointer items-center'>
          <Input
          type='file'
          className='cursor-pointer outline-none border-none'
          {...register("file", {required: document? false:true})}
          />
          {document && <Link
          className='inline-flex items-center'
          to={document.file}>
            <span className='hover:text-gray-500 cursor-pointer p-1 inline-block'>
            <Eye />
            </span>
          </Link>}
        </div>
        <Select
         options={['SOP', 'HIRA']}
         {...register("documentType", {required: true, defaultValue: 'SOP'})}
        />
        <Button
         type='submit'
         className='w-full py-1.5 
         rounded-md uppercase text-white font-medium hover:bg-blue-500'
        >{document? "Update Document": "Create document"}</Button>
      </form> 
      <Toaster/>
     </Container>

  )
}
export default Form

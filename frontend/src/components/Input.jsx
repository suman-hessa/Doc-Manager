import React, {useId} from 'react'


export default function Input({
    label, 
    type, 
    className = '',
    ref, 
    ...props
}) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label
      className='block ml-1 font-semibold'      
      htmlFor={id}>{label}</label>}
      <input 
      type={type}
      className={`${className} px-4 py-2 rounded-md text-md outline-none border-gray-300 border text-gray-800 w-full mt-1`}
      ref={ref}
      id={id}
      {...props}
      />
    </div>
  )
}
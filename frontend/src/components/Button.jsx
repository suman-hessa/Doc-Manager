import React from 'react'

export default function Button({
    children,
    type="Button",
    bgColor,
    textColor,
    className='',
    ...props
}) {
  return (
    <button
     type={type}
     className={`${bgColor} ${textColor} ${className} px-4 bg-blue-400 duration-200 cursor-pointer`}
     {...props}>
        {children}
    </button>
  )
}
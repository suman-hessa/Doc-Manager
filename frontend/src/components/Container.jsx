import React from 'react'

function Container({children}) {
  return (
    <div className='border border-gray-300 shadow-md my-8 mx-4 rounded-lg px-6 py-4'>
      {children}
    </div>
  )
}

export default Container

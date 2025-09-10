import React from 'react'

const PageFallback = () => {
  return (
    <div className='flex justify-center h-screen items-center'>
      <p><span className='loading loading-ring loading-lg'></span> FilmsVault is loading...</p>
    </div>
  )
}

export default PageFallback

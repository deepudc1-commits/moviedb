import React from 'react'
import { Outlet, useNavigation } from 'react-router'
import { Footer, Navbar } from '../components'

const HomeLayout = () => {
  const navigation = useNavigation()  
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-[100dvh] flex-r'>
      <Navbar />
      {navigation.state === 'loading' ? <div className='flex justify-center'><span className="loading loading-dots loading-xl"></span></div> : <Outlet />}
      <Footer />
    </div>
  )
}

export default HomeLayout

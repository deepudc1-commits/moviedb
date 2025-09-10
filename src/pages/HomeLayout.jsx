import React from 'react'
import { Outlet, useNavigation } from 'react-router'
import { Footer, Navbar } from '../components'

const HomeLayout = () => {
  const navigation = useNavigation()  
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-[100dvh] flex-r'>
      <Navbar />
      {navigation.state === 'loading' ? <div className='h-screen flex items-center justify-center'><span className='loading loading-ring loading-lg'></span></div> : <Outlet />}
      <Footer />
    </div>
  )
}

export default HomeLayout

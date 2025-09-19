import React from 'react'
import { Outlet, useNavigation } from 'react-router'
import { Footer, Navbar } from '../components'
import ScrollToTop from '../components/ScrollToTop'

const HomeLayout = () => {
  const navigation = useNavigation()  
  const isLoading = navigation.state === 'loading' 
  return (
    <>
      <ScrollToTop />
      <div className='grid grid-rows-[auto_1fr_auto] min-h-[100dvh] flex-r'>
        <Navbar />
        {isLoading && (
          <div className='fixed inset-0 flex items-center justify-center bg-white opacity-80 z-50'>
            <span className='loading loading-ring loading-lg'></span>
          </div>
        )}
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default HomeLayout

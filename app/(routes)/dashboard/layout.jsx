import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'


function DashBoardLayout({children}) {
    
  return (
    <>
    <div className='fixed md:w-64 hidden md:block'>
        <SideNav/>
        </div>
    <div className='md:ml-64'>
        <DashboardHeader/>
        {children}</div>
    </>
    
  )
}

export default DashBoardLayout
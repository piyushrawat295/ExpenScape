import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='p-4 shadow-sm border-b items-center flex justify-between'>
        <div>
            Search Bar

        </div>
        <div>
            <UserButton/>

        </div>
    </div>
  )
}

export default DashboardHeader
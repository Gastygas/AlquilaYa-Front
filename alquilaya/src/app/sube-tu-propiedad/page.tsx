import Header from '@/Components/Header/Header'
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes'
import React from 'react'

const page = ({children}: any) => {
  return (
   <ProtectedRoute>
      <Header/>
      <div>{children}</div>
    </ProtectedRoute>
  )
}

export default page
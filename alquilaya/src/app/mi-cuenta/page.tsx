import Header from '@/Components/Header/Header'
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
    <div>
        <Header/>
        Mi cuenta</div>
        </ProtectedRoute>
  )
}

export default page
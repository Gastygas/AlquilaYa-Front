import Header from '@/Components/Header/Header'
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes'
import UserHistory from '@/Components/UserHistory/UserHistory'
import UserInformationCard from '@/Components/UserInformationCard/UserInformationCard'
import UserPropertiesFav from '@/Components/UserPropertiesFav/UserPropertiesFav'
import UserPropertiesHistory from '@/Components/UserPropertiesHistory/UserPropertiesHistory'
import Image from 'next/image'

const page = () => {
  return (
    <ProtectedRoute>
      <div>
        <Header />
        <div className='container'>
          <div className='padding-section gap-8'>
            <h1 className='pb-12'>Tu cuenta</h1>
            <div className='flex flex-row w-full gap-8'>
              <UserInformationCard />
              <UserPropertiesFav />
            </div>
              <UserHistory/>
              <UserPropertiesHistory/>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default page
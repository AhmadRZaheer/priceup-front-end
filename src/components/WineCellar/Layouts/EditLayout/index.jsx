import CommonLayout from '@/components/CommonLayout'
import React from 'react'
import EditWineLayoutComponent from './EditWineLayoutComponent'

const EditWineLayout = () => {
  return (
    <CommonLayout>
    <div className="defaultsConatiner">
      <EditWineLayoutComponent />
    </div>
  </CommonLayout>
  )
}

export default EditWineLayout

import CommonLayout from '@/components/CommonLayout'
import React from 'react'
import EditShowerLayout from './EditShowerLayout'

const EditLayout = () => {
  return (
    <CommonLayout>
    <div className="defaultsConatiner">
        <EditShowerLayout/>        
    </div>
    </CommonLayout>
  )
}

export default EditLayout

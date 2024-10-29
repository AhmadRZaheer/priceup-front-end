import CommonLayout from '@/components/CommonLayout'
import SuperAdminDashboardPage from '@/components/SuperAdminDashboard'
import React from 'react'

const SuperAdminDashboard = () => {
  return (
    <CommonLayout>
        <div className="teamContainer">
          <SuperAdminDashboardPage />
        </div>
      </CommonLayout>
  )
}

export default SuperAdminDashboard

import React from 'react'
import "./customers.scss"
import Sidebar from '../../components/Sidebar/Sidebar'
import Customertable from '../../components/CustomerTable/Customertable'

const Customers = () => {
  return (
    <div className="Customers">
      <Sidebar/>
      <div className="customersContainer">
        <Customertable/>
      </div>
    </div>
  )
}

export default Customers
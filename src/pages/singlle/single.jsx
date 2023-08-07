import React from 'react'
import "./single.scss"
import Sidebar from '../../components/Sidebar/sidebar'
import userImg from "../../Assets/profile.jpg";
import Table from '../../components/table/table'

const Single = () => {
  return (
    <div className="single">
        <Sidebar/>
        <div className="singleContainer">
            <div className="top">
                <div className="left">
                    <div className="editButton">
                        Edit
                    </div>
                    <h1 className="title">Information</h1>
                    <div className="item">
                        <img src={userImg} alt="" className="itemImg" />
                        <div className="details">
                            <h1 className="itemTitle">Olivia Rhye</h1>
                            <div className="detailItem">
                                <span className="itemKey">Email:</span>
                                <span className="itemValue">Olivia@glassexperts.com</span>
                                
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Phone:</span>
                                <span className="itemValue">030303032</span>
                                
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Address:</span>
                                <span className="itemValue">Elton st.123</span>
                                
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Country:</span>
                                <span className="itemValue">USA</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <button className="AddMember">Add Member</button>
                </div>
            </div>
            <div className="bottom1">
              <h1 className="title">Team Members</h1>
                <Table/>
            </div>

        </div>
    </div>
  )
}

export default Single
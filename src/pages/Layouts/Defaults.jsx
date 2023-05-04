import React from 'react'
import './defaults.scss'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Sidebar from '../../components/Sidebar/Sidebar';
import Tabss from '../../components/layouts/Tabss';

const Defaults = (Props) => {
  return (
    <>
    <div className="Defaults">
    <Sidebar/>
    <div className="defaultsConatiner">
      <h1 className="title">Defaults</h1>
      <Tabss/>
    </div>
    </div>
    
    </>
   
  )
}

export default Defaults
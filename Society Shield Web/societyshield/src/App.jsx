import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './Header'
import Home from './Home'
import Sidebar from './Sidebar'
import Members from './Members'
import RecordPayment from './RecordPayment'
import ManagePayments from './ManagePayments'
import Reports from './Reports'
import Settings from './Settings'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
     <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Members" element={<Members/>}/>
        <Route path="/RecordPayment" element={<RecordPayment/>}/>
        <Route path="/ManagePayments" element={<ManagePayments/>}/>
        <Route path="/Reports" element={<Reports/>}/>
        <Route path="/Settings" element={<Settings/>}/>
        </Routes>
        
      </div>
      </Router>
  )
}

export default App

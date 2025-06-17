import React from 'react'
import './Body.css'
import Home from './Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Milestone1 from './Milestones/Milestone1/Milestone1'

const Body = () => {
  return (
        <div className='main'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/milestone1' element={<Milestone1/>}/>
            </Routes>

        </div>
  )
}

export default Body
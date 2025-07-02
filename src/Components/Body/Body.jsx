import React from 'react'
import './Body.css'
import Home from './Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Milestone1 from './Milestones/Milestone1/Milestone1'
import Milestone2 from './Milestones/Milestone2/Milestone2';

const Body = () => {
  return (
        <div className='main'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/milestone1' element={<Milestone1/>}/>
                <Route path='/milestone2' element={<Milestone2/>}/>
            </Routes>

        </div>
  )
}

export default Body
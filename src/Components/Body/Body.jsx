import React from 'react'
import './Body.css'
import Home from './Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Milestone1 from './Milestones/Milestone1/Milestone1'
import Milestone2 from './Milestones/Milestone2/Milestone2';
import Milestone3 from './Milestones/Milestone3/Milestone3';

const Body = () => {
  return (
        <div className='main'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/milestone1' element={<Milestone1/>}/>
                <Route path='/milestone2' element={<Milestone2/>}/>
                <Route path='/milestone3' element={<Milestone3/>}/>
            </Routes>

        </div>
  )
}

export default Body
import React, { useState } from 'react'
import SingleView from './SingleView'
import SearchView from './SearchView'
import './Milestone1.css'

const Milestone1 = () => {
    const [ viewSingle, setViewSingle ] = useState(true);

  return (
    <div className='fullBody'>
        <div className='title'>
            Milestone 1
        </div>
        <div className='viewOptions'>
            <button className='btn btn-secondary' onClick={() => setViewSingle(true)}>Single Book</button>
            <button className='btn btn-secondary' onClick={() => setViewSingle(false)}>Search Books</button>
        </div>
        <div className='body'>
            {viewSingle ? <SingleView/> : <SearchView/>}
        </div>

    </div>
  )
}

export default Milestone1
import React, { useState } from 'react'
import SingleView from './SingleView'
import SearchView from './SearchView'
import BonusView from './BonusView'
import './Milestone1.css'

const Milestone1 = () => {
    const [ viewPage, setViewPage ] = useState(1);

    const displayViewPage = () => {
        if( viewPage === 1 ) {
            return <SingleView/>
        } else if ( viewPage === 2 ) {
            return <SearchView/>
        } else if ( viewPage === 3 ) {
            return <BonusView/>
        }
    }

  return (
    <div className='fullBody'>
        <div className='title'>
            Milestone 1
        </div>
        <div className='viewOptions'>
            <button className='btn btn-secondary' onClick={() => setViewPage(1)}>Single Book</button>
            <button className='btn btn-secondary' onClick={() => setViewPage(2)}>Search Books</button>
            <button className='btn btn-secondary' onClick={() => setViewPage(3)}>Bonus Books</button>
        </div>
        <div className='body'>
            {displayViewPage()}
        </div>

    </div>
  )
}

export default Milestone1
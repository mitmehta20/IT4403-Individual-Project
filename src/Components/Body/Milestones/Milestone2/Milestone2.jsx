import React, { useState, useEffect } from 'react'
import BookSearch from './BookSearch'
import './Milestone2.css'
import BookshelfView from './BookshelfView';

const Milestone2 = () => {

    const [ viewSearch, setViewSearch ] = useState(true);

    const onClickMyBookshelf = () => {
      setViewSearch(false);
    } 
    
    const onClickSearch = () => {
        setViewSearch(true);
    }

    

  return (
    <div className='full-container'>
      <div className='title-header'><h1>Milestone 2</h1></div>
        <div className='tab-container'>
            <button className='tab-button' onClick={onClickSearch}>Book Search</button>
            <button className='tab-button' onClick={onClickMyBookshelf}>My Bookshelf</button>
        </div>

        <div className='content-container'>
            
        {viewSearch ? <BookSearch /> : <BookshelfView/>}
        
        </div>
    </div>
  )
}

export default Milestone2
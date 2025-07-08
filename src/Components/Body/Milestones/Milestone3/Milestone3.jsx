import React, { useState } from 'react'
import SearchView from './SearchView';
import BookView from './BookView';
import './Milestone3.css';

const Milestone3 = () => {

  const [ bookData, setBookData ] = useState(null);
  const [ bookView, setBookView ] = useState(false);
  const [ viewHeight, setViewHeight ] = useState(bookView ? ['50vh', '50vh'] : ['100vh', '0vh'] );

  const onBookDataCallback = (bookData) => {
    setBookData(bookData);
    setViewHeight( ['50vh', '50vh'] );
    setBookView(true);
  }

  const onBookViewCloseCallback = () => {
    setViewHeight( ['100vh', '0vh'] );
    setBookView(false);
  }


  return (
    <div className='search-dual-container'>
      <div className='split-screen-layout' style={{gridTemplateRows:`${viewHeight[0]} ${viewHeight[1]} `}}>
      <div className='search-container' style={{height: viewHeight[0]}}>
      <SearchView parentCallBack={onBookDataCallback}/>
      </div>

      <div className='book-view-container'>
      {bookView ? 
      <div className='book-holder'><BookView data={bookData} parentCallBack={onBookViewCloseCallback} /></div>
        : <div className='empty-book-view'></div>}
      </div>
      </div>
    </div>
  )
}

export default Milestone3
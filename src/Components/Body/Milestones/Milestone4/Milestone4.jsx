import React, { useState, useEffect } from 'react'
import SearchView from './SearchView';
import BookView from './SingleBookView';
import './Milestone4.css';
import bookshelfBackupJson from '../../../../assets/milestone4/myBookShelfBackup.json'
import BookshelfView from './BookshelfView';


const Milestone4 = () => {

  useEffect(() => {
    onRetrieveBookshelf();
  }, []);

  const [ bookData, setBookData ] = useState(null);
  const [ bookView, setBookView ] = useState(false);
  const [ viewBookshelf, setViewBookshelf ] = useState(false);
  const [ bookshelfItems, setBookshelfItems ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const onBookDataCallback = (bookData) => {
    setBookData(bookData);
    setBookView(true);
  }

  const onBookViewCloseCallback = () => {
    setBookView(false);
  }

  const onShowBookshelfView = () => {
    setViewBookshelf(true);
}

const onRetrieveBookshelf = async () => {

  setLoading(true)

  const singleBookUrl = `https://www.googleapis.com/books/v1/users/107470483088419466457/bookshelves/1001/volumes`

  try {
      const response = await fetch(singleBookUrl,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OAUTH_ACCESS_KEY}`
          }
        });
      const data = await response.json();

      if(data.error) {
          console.log(`Error Fetching Bookshelf: ${data.error}`);
          console.log('Using Backup JSON File ...')
          setLoading(false);
          setBookshelfItems(bookshelfBackupJson.items)
      } else {
          console.log('Bookshelf Retrieved from Google Books API!')
          setLoading(false);
          setBookshelfItems(data.items);
      }
  } catch (error) {
      console.log(error);
      console.log('Using Backup JSON File ...')
      setLoading(false);
      setBookshelfItems(bookshelfBackupJson.items)
  }
}

const onBookshelfRefresh = () => {
  onRetrieveBookshelf();
}


  return (
    <div className='full-body-container'>
      <div className='view-selection'>
        <button 
          onClick={() => setViewBookshelf(false)}
          className={!viewBookshelf ? 'selection select-active' : 'selection'}>
            Search Books
        </button>
        <button
          onClick={onShowBookshelfView}
          className={viewBookshelf ? 'selection select-active' : 'selection'}>
              View Bookshelf
        </button>
      </div>
      <div className='search-container' id={viewBookshelf ? 'search-container-no-overflow' : 'search-container-overflow'}>
      <SearchView parentCallBack={onBookDataCallback}/>
      </div>

      <div className={`bookshelf-container ${viewBookshelf ? 'visible' : 'hidden'}`}>
      <div className='bookshelf-holder'>
        <BookshelfView 
        items={bookshelfItems} 
        parentCallBack={onBookDataCallback}
        onRefresh={onBookshelfRefresh}/>
      </div>
      </div>
      

      {bookView ?
      <div className='mileston-4-book-view-container'> 
      <div className='milestone-4-bookshelf-holder'><BookView data={bookData} parentCallBack={onBookViewCloseCallback} /></div>
      </div>
        : null }
    </div>
  )
}

export default Milestone4
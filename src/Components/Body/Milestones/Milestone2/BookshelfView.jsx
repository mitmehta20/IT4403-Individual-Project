import React, { useState } from 'react';
import BookView from './BookView';
import bookshelfBackupJson from '../../../../assets/milestone2/myBookShelfBackup.json';
import './BookshelfView.css';

const BookshelfView = () => {

    const [ bookshelfItems, setBookshelfItems ] = useState([]);
    const [ singleBookView, setSingleBookView ] = useState(false);
    const [ singleBook, setSingleBook ] = useState(null);
    const [ loading, setLoading ] = useState(false);

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
                console.log('Using Backup JSON File at  ...')
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

    const onClickBook = async (event) => {
        const singleBookUrl = `https://www.googleapis.com/books/v1/volumes/${event.target.id}`

        try {
            const response = await fetch(singleBookUrl);
            const data = await response.json();
            setSingleBook(data);
            setSingleBookView(true);
        } catch (error) {
            console.log(error);
        }
    }

    const parentCallBack = () => {
        setSingleBookView(false);
    }


  return (
    <>

{ singleBookView ? <div><BookView data={singleBook} parentCallBack={parentCallBack} /></div> :
    <div>
        <div className='bookshelf-retrieval-container'>
            <button className='bookshelf-retrieval-button' onClick={onRetrieveBookshelf}>Retrieve Bookshelf</button>
            <div className='bookshelf-name'>Bookshelf Name: IT4403-Public-Bookshelf</div>
        </div>
        <div className='loading-view'>
            { loading && <div><i>Loading...</i></div> }
        </div>

        {bookshelfItems.length === 0 ? null : bookshelfItems.map((item, index) => {
      return (
        <div key={index} className='search-item-container'>
          <div className="search-item-title">
            <div className='book-title'><a className='book-title-link' id={item.id} onClick={onClickBook}>{`${item.volumeInfo.title}`}{item.volumeInfo.subtitle ? `: ${item.volumeInfo.subtitle}` : null}</a></div>
            <div className='book-author-publisher'>{`${item.volumeInfo.authors?.join(', ')} - ${item.volumeInfo.publisher}, ${item.volumeInfo.publishedDate?.substring(0,4)}`}</div>
          </div>
          <div className='search-item-info'>
            <div className='search-thumbnail'>
              <img src={item.volumeInfo.imageLinks?.smallThumbnail}></img>
            </div>
            <div className='search-item-info-right'>
              <div className='search-item-url'>
                <a href={item.volumeInfo.previewLink} target='_blank'>Click Here to Preview Book</a>
                </div>
                <div className="book-description">
<div/>
        {item.volumeInfo.description?.length > 450 ? `${item.volumeInfo.description?.substring(0,450)} ...` : item.volumeInfo.description}
</div>
            </div>
          </div>
        </div>
      )
    })}
        
    </div>
    }

    </>
  )
}

export default BookshelfView
import React, { useState } from 'react';
import './BookshelfView.css';
import ListImg from '../../../../assets/milestone4/list.png';
import GridImg from '../../../../assets/milestone4/grid.png';
import RefImg from '../../../../assets/milestone4/refresh-icon.png'

const BookshelfView = ({ items, parentCallBack, onRefresh }) => {

  const [ viewType, setViewType ] = useState('list');

  const onClickBook = async (event) => {
    const singleBookUrl = `https://www.googleapis.com/books/v1/volumes/${event.target.id}`

    try {
        const response = await fetch(singleBookUrl);
        const data = await response.json();
        parentCallBack(data);
    } catch (error) {
        console.log(error);
    }
}

const bookSearchBuilder = () => {
  let descriptionSize = viewType === 'list' ? 450 : 250;

  return items.map((item, index) => {
    return (
      <div key={index} className={`search-item-container-${viewType}`}>
        <div className={`search-item-title-${viewType}`}>
          <div className='book-title'><a className={`book-title-link-${viewType}`} id={item.id} onClick={onClickBook}>{`${item.volumeInfo.title}`}{item.volumeInfo.subtitle ? `: ${item.volumeInfo.subtitle}` : null}</a></div>
          <div className={`book-author-publisher-${viewType}`}>{`${item.volumeInfo.authors?.join(', ')} - ${item.volumeInfo.publisher}, ${item.volumeInfo.publishedDate?.substring(0,4)}`}</div>
        </div>
        <div className={`search-item-info-${viewType}`}>
      { !item.volumeInfo.imageLinks?.smallThumbnail ? <div className={`search-thumbnail-${viewType}`}>No Image Available</div> :
          <div className={`search-thumbnail-${viewType}`}>
            <img src={item.volumeInfo.imageLinks.smallThumbnail}></img>
          </div>
      }
          <div className={`search-item-info-right-${viewType}`}>
            <div className={`search-item-url-${viewType}`}>
              <a href={item.volumeInfo.previewLink} target='_blank'>Click Here to Preview Book</a>
              </div>
              <div className={`book-description`}>
      <div/>
      {item.volumeInfo.description?.length > descriptionSize ? `${item.volumeInfo.description?.substring(0,descriptionSize)} ...` : item.volumeInfo.description}
      </div>
          </div>
        </div>
      </div>
    )
  })
}

  return (
    <>



    <div className='bookshelf-view-title'>BookShelf Name: IT4403-Public-Bookshelf
    <div className='view-select-options'>
          <button className={viewType === 'list' ? 'view-type-btn active-type' : 'view-type-btn' } onClick={() => setViewType('list')}><img 
            alt='List Layout' 
            src={ListImg}
            width='24px'
            height='24px'/>
          </button>
          <button className={viewType === 'grid' ? 'view-type-btn active-type' : 'view-type-btn' } onClick={() => setViewType('grid')}><img
          alt='Grid Layout'
          src={GridImg}
          width='24px'
          height='24px'
          /></button>
        <label className='refresh-label'>Refresh Bookshelf: </label>
        <button className='view-type-btn' onClick={onRefresh}><img
          alt='Refresh Bookshelf'
          src={RefImg}
          width='24px'
          height='24px'
          /></button>
          </div>
    </div>
    <div>
    <div className={`search-results-container-${viewType}`}>
    {items.length !== 0 && bookSearchBuilder()}
    </div>
        
    </div>

    </>
  )
}

export default BookshelfView
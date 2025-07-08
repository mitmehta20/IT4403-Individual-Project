import React, { useState } from 'react';
import './BookshelfView.css';

const BookshelfView = ({ items, parentCallBack }) => {

  return (
    <>

    <div className='bookshelf-view-title'><h3>BookShelf Name: IT4403-Public-Bookshelf</h3></div>
    <div>
        {items.length === 0 ? null : items.map((item, index) => {
      return (
        <div key={index} className='search-item-container'>
          <div className="search-item-title">
            <div className='book-title'><a className='book-title-link' id={item.id} onClick={parentCallBack}>{`${item.volumeInfo.title}`}{item.volumeInfo.subtitle ? `: ${item.volumeInfo.subtitle}` : null}</a></div>
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

    </>
  )
}

export default BookshelfView
import singleViewJson from '../../../../assets/milestone1/singleView.json'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import './SingleView.css';

const SingleView = () => {
  const [ showDescription, setShowDescription ] = useState(false)

  const onShowDescription = () => {
    setShowDescription(!showDescription)
  }

  return (
    <div className="book-details-container">
      <div className="book-main-content">
        <div className="book-left-section">
          <div className="book-cover">
            <img 
              src={singleViewJson.volumeInfo.imageLinks.thumbnail} 
              alt={`${singleViewJson.volumeInfo.title} cover`}
              className="book-image"
            />
          </div>
        </div>

        <div className="book-right-section">
          <h1 className="book-title">{singleViewJson.volumeInfo.title}</h1>
          <div className="book-subtitle">{singleViewJson.volumeInfo.subtitle}</div>
          <div className="book-authors">
            By {singleViewJson.volumeInfo.authors.join(', ')}
          </div>
          <div className='book-publisher'>
            {`${singleViewJson.volumeInfo.publisher} - ${singleViewJson.volumeInfo.publishedDate}`}
          </div>
          <div className="book-description">

            {!showDescription && <button onClick={onShowDescription}>Show Description</button>}
            
            {showDescription && <><div 
              dangerouslySetInnerHTML={{ 
                __html: singleViewJson.volumeInfo.description 
              }} 
            /> 
            <button onClick={onShowDescription}>Hide Description</button></>}
            
          </div>
        </div>
      </div>

      <div className='book-information'>
        <h1 className='book-information-title'>Bibliographic Information</h1>
        <table className='book-information-table'>
          <tbody>
          <tr>
            <td>Title</td>
            <td>{singleViewJson.volumeInfo.title}</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{singleViewJson.volumeInfo.authors.join(', ')}</td>
          </tr>
          <tr>
            <td>Publisher</td>
            <td>{`${singleViewJson.volumeInfo.publisher}, ${singleViewJson.volumeInfo.publishedDate}`}</td>
          </tr>
          <tr>
            <td>ISBN</td>
            <td>{singleViewJson.volumeInfo.industryIdentifiers.map((isbn, index) => {
              return index == singleViewJson.volumeInfo.industryIdentifiers.length - 1 ? `${isbn.identifier}` : `${isbn.identifier}, `
            })}</td>
          </tr>
          <tr>
            <td>Length</td>
            <td>{`${singleViewJson.volumeInfo.pageCount} pages`}</td>
          </tr>
          <tr>
            <td>Subjects</td>
            <td>
    {singleViewJson.volumeInfo.categories.map((category) => (
      <div key={category}>{category}</div>
    ))}
  </td>
          </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default SingleView;

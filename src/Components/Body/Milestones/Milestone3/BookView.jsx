import React, { useState } from 'react'
import './BookView.css'

const BookView = ( { data, parentCallBack } ) => {

    const [ showDescription, setShowDescription ] = useState(false)

    const onShowDescription = () => {
      setShowDescription(!showDescription)
    }

    const onBackOption = () => {
      parentCallBack()
    }
  
    return (
        <>
        <div><button onClick={onBackOption} className='back-button'>Close</button></div>
      <div className="book-details-container">
        <div className="book-main-content">
          <div className="book-left-section">
            <div className="book-cover">
              <img 
                src={data.volumeInfo.imageLinks?.thumbnail} 
                alt={`${data.volumeInfo.title} cover`}
                className="book-image"
              />
            </div>
          </div>
  
          <div className="book-right-section">
            <h1 className="book-title">{data.volumeInfo.title}</h1>
            <div className="book-subtitle">{data.volumeInfo.subtitle}</div>
            <div className="book-authors">
              By {data.volumeInfo.authors?.join(', ')}
            </div>
            <div className='book-publisher'>
              {`${data.volumeInfo.publisher} - ${data.volumeInfo.publishedDate}`}
            </div>
            <div className='search-item-url'>
                <a href={data.volumeInfo.previewLink} target='_blank'>Click Here to Preview Book</a>
                </div>
            <div className="book-description">
  
              {!showDescription && <button onClick={onShowDescription}>Show Description</button>}
              
              {showDescription && <><div 
                dangerouslySetInnerHTML={{ 
                  __html: data.volumeInfo.description 
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
              <td>{data.volumeInfo.title}</td>
            </tr>
            <tr>
              <td>Author</td>
              <td>{data.volumeInfo.authors.join(', ')}</td>
            </tr>
            <tr>
              <td>Publisher</td>
              <td>{`${data.volumeInfo.publisher}, ${data.volumeInfo.publishedDate}`}</td>
            </tr>
            <tr>
              <td>ISBN</td>
              <td>{data.volumeInfo.industryIdentifiers?.map((isbn, index) => {
                return index == data.volumeInfo.industryIdentifiers.length - 1 ? `${isbn.identifier}` : `${isbn.identifier}, `
              })}</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>{`${data.volumeInfo.pageCount} pages`}</td>
            </tr>
            <tr>
              <td>Subjects</td>
              <td>
      {data.volumeInfo.categories?.map((category) => (
        <div key={category}>{category}</div>
      ))}
    </td>
            </tr>
            </tbody>
          </table>
  
        </div>
  
      </div>
      </>
    );
}

export default BookView
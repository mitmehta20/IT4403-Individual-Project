import React, { useState } from 'react'
import './SingleBookView.css'

const SingleBookView = ( { data, parentCallBack } ) => {

    const [ showDescription, setShowDescription ] = useState(false)

    const onShowDescription = () => {
      setShowDescription(!showDescription)
    }

    const onBackOption = () => {
      parentCallBack()
    }
  
    return (
        <>
        <div><button onClick={onBackOption} className='mileston-4-back-button'>Close</button></div>
      <div className="mileston-4-book-details-container">
        <div className="mileston-4-book-main-content">
          <div className="mileston-4-book-left-section">
            <div className="mileston-4-book-cover">
              <img 
                src={data.volumeInfo.imageLinks?.thumbnail} 
                alt={`${data.volumeInfo.title} cover`}
                className="mileston-4-book-image"
              />
            </div>
          </div>
  
          <div className="mileston-4-book-right-section">
            <h1 className="mileston-4-book-title">{data.volumeInfo.title}</h1>
            <div className="mileston-4-book-subtitle">{data.volumeInfo.subtitle}</div>
            <div className="mileston-4-book-authors">
              By {data.volumeInfo.authors?.join(', ')}
            </div>
            <div className='mileston-4-book-publisher'>
              {`${data.volumeInfo.publisher} - ${data.volumeInfo.publishedDate}`}
            </div>
            <div className='mileston-4-search-item-url'>
                <a href={data.volumeInfo.previewLink} target='_blank'>Click Here to Preview Book</a>
                </div>
            <div className="mileston-4-book-description">
  
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
  
        <div className='mileston-4-book-information'>
          <h1 className='mileston-4-book-information-title'>Bibliographic Information</h1>
          <table className='mileston-4-book-information-table'>
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

export default SingleBookView
import React from 'react'
import bonusViewJson from '../../../../assets/milestone1/bonusView.json';
import './SingleView.css';

const BonusView = () => {
    const isbn = bonusViewJson['ISBN:0201558025'];
    const lccn = bonusViewJson['LCCN:93005405'];

  return (
    <>
    <div className="book-details-container">
      <div className="book-main-content">
        <div className="book-left-section">
          <div className="book-cover">
            <img 
              src={isbn.cover.medium} 
              alt={`${isbn.title} cover`}
              className="book-image"
            />
          </div>
        </div>

        <div className="book-right-section" style={{marginLeft:'20px'}}>
          <h1 className="book-title">{isbn.title}</h1>
          <div className="book-subtitle">{isbn.subtitle}</div>
          <div className="book-authors">
            By {isbn.authors.map((n) => {return n.name}).join(', ')}
          </div>
          <div className='book-publisher'>
            {`${isbn.publishers.map((pub) => {return pub.name}).join(', ')} - ${isbn.publish_date}`}
          </div>
        </div>
      </div>

      <div className='book-information'>
        <h1 className='book-information-title'>Bibliographic Information</h1>
        <table className='book-information-table'>
          <tbody>
          <tr>
            <td>Title</td>
            <td>{isbn.title}</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{isbn.authors.map((n) => {return n.name}).join(', ')}</td>
          </tr>
          <tr>
            <td>Publisher</td>
            <td>{`${isbn.publishers.map((pub) => {return pub.name}).join(', ')}, ${isbn.publish_date}`}</td>
          </tr>
          <tr>
            <td>ISBN</td>
            <td>{isbn.identifiers.isbn_10.join(', ')}</td>
          </tr>
          <tr>
            <td>Length</td>
            <td>{`${isbn.number_of_pages} pages`}</td>
          </tr>
          <tr>
            <td>Subjects</td>
            <td>
    {isbn.subjects.map((category) => (
      <div key={category.name}>{category.name}</div>
    ))}
  </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>


    <div className="book-details-container">
      <div className="book-main-content">
        <div className="book-left-section">
          <div className="book-cover">
            <img 
              src={lccn.cover.medium} 
              alt={`${lccn.title} cover`}
              className="book-image"
            />
          </div>
        </div>

        <div className="book-right-section" style={{marginLeft:'20px'}}>
          <h1 className="book-title">{lccn.title}</h1>
          <div className="book-subtitle">{lccn.subtitle}</div>
          <div className="book-authors">
            By {lccn.authors.map((n) => {return n.name}).join(', ')}
          </div>
          <div className='book-publisher'>
            {`${lccn.publishers.map((pub) => {return pub.name}).join(', ')} - ${lccn.publish_date}`}
          </div>
        </div>
      </div>

      <div className='book-information'>
        <h1 className='book-information-title'>Bibliographic Information</h1>
        <table className='book-information-table'>
          <tbody>
          <tr>
            <td>Title</td>
            <td>{lccn.title}</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{lccn.authors.map((n) => {return n.name}).join(', ')}</td>
          </tr>
          <tr>
            <td>Publisher</td>
            <td>{`${lccn.publishers.map((pub) => {return pub.name}).join(', ')}, ${lccn.publish_date}`}</td>
          </tr>
          <tr>
            <td>ISBN</td>
            <td>{lccn.identifiers.isbn_10.join(', ')}</td>
          </tr>
          <tr>
            <td>Length</td>
            <td>{`${lccn.number_of_pages} pages`}</td>
          </tr>
          <tr>
            <td>Subjects</td>
            <td>
    {lccn.subjects.map((category) => (
      <div key={category.name}>{category.name}</div>
    ))}
  </td>
          </tr>
          </tbody>
        </table>

      </div>

    </div>


    </>
  )
}

export default BonusView
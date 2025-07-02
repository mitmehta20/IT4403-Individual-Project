import React, { useState } from 'react'
import './BookSearch.css'
import BookView from './BookView';

const BookSearch = () => {

    const [ searchText, setSearchText ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ singleBookView, setSingleBookView ] = useState(false);
    const [ singleBook, setSingleBook ] = useState(null);
    const [ pageCount, setPageCount ] = useState(0);
    const [ page, setPage ] = useState(0);

    const apiKey = import.meta.env.VITE_API_KEY

    const onChange = (e) => {
        setSearchText(e.target.value);
    }

    const onSubmit = async () => {

        setLoading(true);
        
        let data = await callGoogleBooksAPI(searchText, 0, 40);

        if(data.items.length === 40) {
            const additionalData = await callGoogleBooksAPI(searchText, 40, 20);
            additionalData.items?.length > 0 ? data.items = data.items?.concat(additionalData.items) : null;

        }
        
        setPageCount(Math.ceil(data.items.length / 10));
        setPage(1);
        setLoading(false);
        setSearchResults(data);
    
    }

    const callGoogleBooksAPI = async (searchText, startIndex, maxResults) => {

        const searchParam = searchText.trim().replaceAll(' ', '+');

        const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${searchParam}&startIndex=${startIndex}&maxResults=${maxResults}`

        try {
            const response = await fetch(searchURL);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }

    }

    const debugFunction = (data) => {
        data.items.map((item, index) => {
            console.log(`Description for Index ${index}: ${item.volumeInfo.description}`);
        })
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

    const displayPageSelection = () => {
        let pageSelection = [];
        for(let i = 1; i <= pageCount; i++) {

            pageSelection.push(
                <>
                <lable className='radio-label'>{i}</lable>
                <input type="radio" onChange={onPageSelect} name="page_select" value={i} checked={page === i}></input>
                </>
                )
        }
        return (pageSelection);
    }

    const onPageSelect = (event) => {
        console.log(event.target.textContent);
        setPage(parseInt(event.target.value));
    }

    const parentCallBack = () => {
        setSingleBookView(false);
    }

  return (

<>
{ singleBookView ? <div><BookView data={singleBook} parentCallBack={parentCallBack} /></div> :
    <div>

    <div className='input-search'>
        <input type="text" placeholder='Enter a book title' onChange={onChange}/>
        <button type='submit' onClick={onSubmit}>Search</button>

        <div className='loading-view'>
        { loading && <div><i>Loading...</i></div> }
    </div>
    </div>

{ pageCount === 0 ? null : 
    <div className='page-selection'>
            <div className='page-selection-text'>Pages: </div>
            <div className='page-select-buttons'>{displayPageSelection() }</div>
            <div className='page-selection-text' id='page-select-display-text'>
            {`Max Results per Page: 10`}
            </div>
    </div>
}

    <div className='results-display'>
        {searchResults.length === 0 ? null : searchResults.items.slice((page-1)*10, page*10).map((item, index) => {
      return (
        <div key={index} className='search-item-container'>
          <div className="search-item-title">
            <div className='book-title'><a className='book-title-link' id={item.id} onClick={onClickBook}>{`${item.volumeInfo.title}`}{item.volumeInfo.subtitle ? `: ${item.volumeInfo.subtitle}` : null}</a></div>
            <div className='book-author-publisher'>{`${item.volumeInfo.authors?.join(', ')} - ${item.volumeInfo.publisher}, ${item.volumeInfo.publishedDate?.substring(0,4)}`}</div>
          </div>
          <div className='search-item-info'>
        { !item.volumeInfo.imageLinks?.smallThumbnail ? <div className='search-thumbnail'>No Image Available</div> :
            <div className='search-thumbnail'>
              <img src={item.volumeInfo.imageLinks.smallThumbnail}></img>
            </div>
        }
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
    </div>
}
</>

  )
}

export default BookSearch
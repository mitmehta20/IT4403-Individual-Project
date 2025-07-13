import React, { useState } from 'react';
import BookView from './SingleBookView';
import './SearchView.css';
import BookshelfView from './BookshelfView';
import bookshelfBackupJson from '../../../../assets/milestone3/myBookShelfBackup.json';
import ListImg from '../../../../assets/milestone4/list.png';
import GridImg from '../../../../assets/milestone4/grid.png';

const SearchView = ( { parentCallBack } ) => {

  const [ searchText, setSearchText ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ pageCount, setPageCount ] = useState(0);
  const [ page, setPage ] = useState(0);
  const [ viewType, setViewType ] = useState('list');
  const [ searchHistory, setSearchHistory ] = useState([]);
  const [ selectedHistory, setSelectedHistory ] = useState('');

  const apiKey = import.meta.env.VITE_API_KEY

  const onChange = (e) => {
      setSearchText(e.target.value);
  }

  const onSubmit = async () => {
      addToSearchHistory();
      await controlSearchStates(searchText);
  }

  const controlSearchStates = async (keyword) => {
    setLoading(true);
    let data = await callGoogleBooksAPI(keyword, 0, 40);

      if(data.items.length === 40) {
          const additionalData = await callGoogleBooksAPI(keyword, 40, 10);
          additionalData.items?.length > 0 ? data.items = data.items?.concat(additionalData.items) : null;

      }
      
      setPageCount(Math.ceil(data.items.length / 9));
      setPage(1);
      setLoading(false);
      setSearchResults(data);

  }

  const addToSearchHistory = () => {
    if (!searchHistory.includes(searchText)) {
    setSearchHistory(searchHistory => {
        let newHistory = [searchText, ...searchHistory]
        if (newHistory.length > 10) {
            newHistory.pop();
        }
        return newHistory;
      }
    )};
  };

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
          parentCallBack(data);
      } catch (error) {
          console.log(error);
      }
  }

  const displayPageSelection = () => {
      let pageSelection = [];
      for(let i = 1; i <= pageCount; i++) {

          pageSelection.push(
              <>
              <button value={i} onClick={onPageSelect} className={page === i ? 'page-btn active' : 'page-btn'}>{i}</button>
              </>
              )
      }
      return (pageSelection);
  }

  const onPageSelect = (event) => {
      setPage(parseInt(event.target.value));
  }

const bookSearchBuilder = () => {
  let descriptionSize = viewType === 'list' ? 450 : 250;

  return searchResults.items.slice((page-1)*9, page*9).map((item, index) => {
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

const handleChange = (event) => {
  const value = event.target.value;
  value ? setSelectedHistory(value) : null;
}

const getSearchHistory = () => {
  return searchHistory.map((hist) => {
    return (
      <option key={hist} value={hist}>{hist}</option>
    )
  })
}

const onSubmitHistory = async() => {
   selectedHistory !== 'no-selection' ? await controlSearchStates(selectedHistory) : null;
}

return (

<>
  <div>

  <div className='input-search'>
    <div className='options'>
      <input type="text" placeholder='Enter a book title' onChange={onChange}/>
      
      <button type='submit' onClick={onSubmit}>Search</button>

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
          </div>
          <div className='search-history'>
          <label className='search-history-label'>Search History: </label>
          <select id='search-history-dropdown' onChange={handleChange}>
          <option value='no-selection'>--Please choose an option--</option>
          {searchHistory.length > 0 && getSearchHistory()}
          </select>
          <button onClick={onSubmitHistory} className='search-history-button'>Search Again</button>
          </div>
          </div>

      <div className='loading-view'>
      { loading && <div><i>Loading...</i></div> }
  </div>
  </div>

<>

{ pageCount === 0 ? null : 
  <div className='page-selection'>
          <div className='page-selection-text'>Pages: </div>
          <div className='page-select-buttons'>{displayPageSelection() }</div>
          <div className='page-selection-text' id='page-select-display-text'>
          {`Max Results per Page: 9`}

          </div>
  </div>
}

  <div className='results-display'>

    {searchResults.length !== 0 && <h3 className='results-header'>Search Results</h3>}

    <div className={`search-results-container-${viewType}`}>
    {searchResults.length !== 0 && bookSearchBuilder()}
    </div>
      
  { pageCount === 0 ? null : 
  <div className='page-selection'>
          <div className='page-selection-text'>Pages: </div>
          <div className='page-select-buttons'>{displayPageSelection() }</div>
          <div className='page-selection-text' id='page-select-display-text'>
          {`Max Results per Page: 9`}
          </div>
  </div>
}
  </div>
  </>

  </div>
</>

)
}

export default SearchView
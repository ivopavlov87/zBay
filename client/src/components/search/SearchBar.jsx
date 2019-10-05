import React from 'react';
import Search from '../search/Search'

const SearchBar = () => {
    return (
       <div className="searchbar-container">
           <Search />
           {/* These are temp button names, mimicing Zillow for now */}
           <button className="searchbar-button">Sale type</button>
           <button className="searchbar-button">Price</button>
           <button className="searchbar-button">Beds</button>
           <button className="searchbar-button">Home type</button>
           <button className="searchbar-button">More</button>
       </div>
    )
}

export default SearchBar;
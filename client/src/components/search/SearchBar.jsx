import React from 'react';
import Search from '../search/Search'

class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
           <div className="searchbar-container">
               <Search />
           </div>
        )
    }
}

export default SearchBar;
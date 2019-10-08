import React from 'react';
import Search from '../search/Search'

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
    }


    handleOpen(){
        const ddMenu = document.getElementById("top-dropdown-menu");
        ddMenu.classList.toggle("hidden")
    }


    render(){
        return (
           <div className="searchbar-container">
               <Search />
               {/* These are temp button names, mimicing Zillow for now */}
               <button onClick={this.handleOpen} className="searchbar-button">Sale type</button>
               <button onClick={this.handleOpen} className="searchbar-button">Price</button>
               <button onClick={this.handleOpen} className="searchbar-button">Beds</button>
               <button onClick={this.handleOpen} className="searchbar-button">Home type</button>
               <button onClick={this.handleOpen} className="searchbar-button">More</button>
           </div>
        )
    }
}

export default SearchBar;
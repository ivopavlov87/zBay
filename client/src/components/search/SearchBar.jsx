import React from 'react';
import Search from '../search/Search'

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        
    }


    handleOpen(e, field){
        const ddMenu = document.getElementById("top-dropdown-menu");
        ddMenu.classList.toggle("hidden")
 
    }


    render(){
        return (
           <div className="searchbar-container">
               <Search />
                <button value="sale-type" onClick={(e) => this.handleOpen(e, "sale-type")} className="searchbar-button">Sale type</button>
                <button value="price" onClick={(e) => this.handleOpen(e, "price")} className="searchbar-button">Price</button>
                <button value="beds" onClick={(e) => this.handleOpen(e, "beds")} className="searchbar-button">Beds</button>
                <button value="home-type" onClick={(e) => this.handleOpen(e, "home-type")} className="searchbar-button">Home type</button>
                <button value="more" onClick={(e) => this.handleOpen(e, "more")} className="searchbar-button">More</button>
           </div>
        )
    }
}

export default SearchBar;
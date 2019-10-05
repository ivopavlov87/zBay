import React from 'react';

import Queries from '../../graphql/queries';

import { Query } from 'react-apollo';
// import * as compose from 'lodash.flowright';
import debounce from 'lodash/debounce'
const { SEARCH_HOMES } = Queries;

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            results: []
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    update(field){
        return (e) => {
            this.setState({ searchQuery: e.target.value })
        }
    }

    handleSearch(e){
        this.setState(this.state)
    }

    render(){
        if (this.state.searchQuery.length === 0 && this.state.results.length === 0){
            return (
                <div className="searchbar-inputs">
                    <input className="searchbar-input-field" type="text" placeholder="Search zBay" value={this.state.searchQuery} onChange={this.update('searchQuery')} />
                    <button className="searchbar-input-button" onClick={(e) => this.handleSearch(e)}>Search</button>
                </div>
            )
        } else {
      
           
            return (
                <div className="searchbar-inputs">
                    <input className="searchbar-input-field" type="text" placeholder="Search zBay" value={this.state.searchQuery} onChange={this.update('searchQuery')} />
                    <button className="searchbar-input-button" onClick={(e) => this.handleSearch(e)}>Search</button>
                    <ul>
                        <Query query={SEARCH_HOMES} variables={{ searchQuery: this.state.searchQuery }}>
                            {({ loading, error, data }) => {
                                if (loading) return <p>Loading...</p>;
                                if (error) return <p>Error</p>;
                                return data.searchHomes.map(home => {
                                    return <li key={home._id}>{home.name}</li>
                                })
                            }}
                        </Query>
                    </ul>
                </div>
            )
        }
    }
}

export default Search;


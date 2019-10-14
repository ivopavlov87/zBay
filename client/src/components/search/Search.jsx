import React from 'react';

import Queries from '../../graphql/queries';

import { Query, ApolloConsumer } from 'react-apollo';

const { SEARCH_HOMES, FETCH_RESULTS } = Queries;

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
                        <ApolloConsumer>
                            {(cache) => (
                                <Query query={SEARCH_HOMES} 
                                    variables={{ searchQuery: this.state.searchQuery }}
                                    update={(cache, { data: { results }}) => {
                                        const data = cache.readQuery({ query: FETCH_RESULTS })
                                        data.results = [...data.results, ...results]
                                        cache.writeQuery({ query: FETCH_RESULTS, data })
                                    }}>
                                    {({ loading, error, data }) => {
                                        if (loading) return <p></p>;
                                        if (error) return <p></p>;
                                
                                        cache.cache.data.data.ROOT_QUERY.results.json = [];
                                        cache.cache.data.data.ROOT_QUERY.results.json.push(data.searchHomes);
                                
                                        return ""
                                    }}
                                </Query>
                            )}
                        </ApolloConsumer>
                    </ul>
                </div>
            )
        }
    }
}

export default Search;


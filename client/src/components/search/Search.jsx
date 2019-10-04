import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import debounce from 'lodash/debounce'

const SEARCH_HOMES = gql`
    query($searchQuery: String) {
        listHomes(filter: {
            searchField: {
                contains: $searchQuery
            }
        }) {
            items {
                streetAddress
                zipcode
                sqft
                stories
                bedrooms
                bathrooms
                description
                yearBuilt
                basement
                garage
            }
        }
    }
`

const LIST_HOMES = gql`
    query {
        listHomes {
            items {
                streetAddress
                zipcode
                sqft
                stories
                bedrooms
                bathrooms
                description
                yearBuilt
                basement
                garage
            }
        }
    }
`

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: ''
        }
    }

    onChange = (e) => {
        const value = e.target.value
        this.handleFilter(value)
    }

    handleFilter = debounce((val) => {
        this.props.onSearch(val)
    }, 250)

    render() {
        const { loading } = this.props.data;
        const { items } = this.props.data.listHomes;
        return (
            <div>
                <input
                    onChange={this.onChange.bind(this)}
                    placeholder="Search zBay"
                />
                {
                    !!loading && (
                        <p>Searching...</p>
                    )
                }
                {
                    !loading && !items.length && (
                        <p>No Results Found</p>
                    )
                }
                {
                    !loading && items.map((item, index) => (
                        <div key={index}>
                            {/* Whatever we want to render for search results */}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default compose(
    graphql(LIST_HOMES, {
        options: data => ({
            fetchPolicy: 'cache-and-network'
        }),
        props: props => ({
            onSearch: searchQuery => {
                return props.data.fetchMore({
                    query: searchQuery === "" ? LIST_HOMES : SEARCH_HOMES,
                    variables: {
                        searchQuery
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => ({
                        ...previousResult,
                        listHomes: {
                            ...previousResult.listHomes,
                            items: fetchMoreResult.listHomes.items
                        }
                    })
                })
            },
            data: props.data
        })
    })
)(Search);
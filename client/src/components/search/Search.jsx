import React from 'react';
import gql from 'graphql-tag';
import { SEARCH_HOMES } from '../../graphql/queries';
import { graphql, Query } from 'react-apollo';
import * as compose from 'lodash.flowright';
import debounce from 'lodash/debounce'



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

    // render() {

    //     const { loading } = this.props.data;
    //     const { items } = this.props.data.listHomes;
    //     return (
    //         <div>
    //             <input
    //                 onChange={this.onChange.bind(this)}
    //                 placeholder="Search zBay"
    //             />
    //             {
    //                 !!loading && (
    //                     <p>Searching...</p>
    //                 )
    //             }
    //             {
    //                 !loading && !items.length && (
    //                     <p>No Results Found</p>
    //                 )
    //             }
    //             {
    //                 !loading && items.map((item, index) => (
    //                     <div key={index}>
    //                         {/* Whatever we want to render for search results */}
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //     )
    // }

    render(){
        return (
            <Query query={SEARCH_HOMES} variables={ {searchQuery: this.state.searchQuery} }>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    if (this)
                }}
            </Query>
        )
    }
}

export default Search;

// export default compose(
//     graphql(LIST_HOMES, {
//         options: data => ({
//             fetchPolicy: 'cache-and-network'
//         }),
//         props: props => ({
//             onSearch: searchQuery => {
//                 return props.data.fetchMore({
//                     query: searchQuery === "" ? LIST_HOMES : SEARCH_HOMES,
//                     variables: {
//                         searchQuery
//                     },
//                     updateQuery: (previousResult, { fetchMoreResult }) => ({
//                         ...previousResult,
//                         listHomes: {
//                             ...previousResult.listHomes,
//                             items: fetchMoreResult.listHomes.items
//                         }
//                     })
//                 })
//             },
//             data: props.data
//         })
//     })
// )(Search);
import React from 'react'
import Queries from '../../graphql/queries';
import { Query, ApolloConsumer } from 'react-apollo';
const { SEARCH_HOMES, FETCH_RESULTS } = Queries;

class SearchClear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: " "
        }
    }

    render(){
        return (
            <ApolloConsumer>
                {(cache) => (
                    <Query query={SEARCH_HOMES}
                        variables={{ searchQuery: this.state.searchQuery }}
                        update={(cache, { data: { results } }) => {
                            const data = cache.readQuery({ query: FETCH_RESULTS })
                            data.results = [...data.results, ...results]
                            cache.writeQuery({ query: FETCH_RESULTS, data })
                        }}>
                        {({ loading, error, data }) => {
                            if (loading) return <p></p>;
                            if (error) return <p></p>;
                            cache.cache.data.data.ROOT_QUERY.results.json = [];
                            // cache.cache.data.data.ROOT_QUERY.results.json.push(data.searchHomes);

                            return ""
                        }}
                    </Query>
                )}
            </ApolloConsumer>
        )
    }
}

export default SearchClear;
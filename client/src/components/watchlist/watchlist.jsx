import React from 'react'
import Queries from '../../graphql/queries'
import Mutations from "../../graphql/mutations";
import { Query, Mutation } from 'react-apollo';
import { useApolloClient } from 'react-apollo-hooks'
const { FETCH_USER, FETCH_USER_ID } = Queries;
const { CREATE_WATCHLIST } = Mutations;

const Watchlist = () => {
    const client = useApolloClient();
    const idPreSearch = client.readQuery({ query: FETCH_USER_ID })
    const idPostSearch = idPreSearch._id
    if (idPostSearch === null) {
        return null
    }

    return (
        <Query query={FETCH_USER} variables={{ id: idPostSearch }}>
            {({ loading, error, data }) => {
                debugger
                if (loading) return <div className="loading">Loading...</div>;
                if (error) return `Error! ${error.message}`;
                if (!data.user.watchlist) {
                    return (
                        <Mutation mutation={CREATE_WATCHLIST}>
                            {(createWatchlist, { loading, data }) => {
                                return (
                                    <button onClick={() => {
                                        createWatchlist({ userId: idPostSearch })
                                    }}>Create Watchlist</button>
                                )
                            }}
                        </Mutation>
                    )
                } else if (data.user.watchlist.homes.length === 0) {
                    return (
                        <div className="watchlist-container">
                            <h1>You havent added any listings yet...</h1>
                            <h3>Click 'Add to Watchlist' and refer back to them here!</h3>
                        </div>
                    )
                } else {
                    let allItems = data.user.watchlist.homes.map(item => {
                        return <li key={item._id}>{item.name}</li>
                    })
                    return (
                        <div className="watchlist-container">
                            <h1>Listings you're watching</h1>
                            <ul>
                                {allItems}
                            </ul>
                        </div>
                    )
                }
            }}
        </Query>
    )

}

export default Watchlist;
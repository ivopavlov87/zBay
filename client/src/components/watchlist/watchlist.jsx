import React from 'react'
import Queries from '../../graphql/queries'
import Mutations from "../../graphql/mutations";
import { Query } from 'react-apollo';
import { useApolloClient } from 'react-apollo-hooks'
const { FETCH_USER, FETCH_USER_ID } = Queries;


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
                if (loading) return <div className="loading">Loading...</div>
                if (error) return `Error! ${error.message}`

                if (data.user.watchlist.length === 0){
                    return (
                        <div className="watchlist-container">
                            <h1>You havent added any listings yet...</h1>
                            <h3>Click 'Add to Watchlist' on a listing to save it here!</h3>
                        </div>
                    )
                } else {
                    let watchlistItems = data.user.watchlist.map(home => {
                        return <li key={home._id}>{home.name}</li>
                    })
                    return (
                        <div className="watchlist-container">
                            <h1>Your watched listings</h1>
                            <ul>
                                {watchlistItems}
                            </ul>
                        </div>
                    )
                }
            }}
        </Query>
    )

}

export default Watchlist;
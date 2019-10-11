import React from 'react';
import { Link } from 'react-router-dom';
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
                        return (
                            <li key={home._id} className="watchlist-li">
                                <Link to={`/homes/${home._id}`}>
                                    <h3>{home.name}</h3>
                                    <h3>{home.streetAddress},&nbsp;{home.city},&nbsp;{home.state}</h3>
                                </Link>
                                <button className="remove-wl-button">Remove Listing</button>
                            </li>
                        )
                    })
                    return (
                        <div className="watchlist-container">
                            <h1 className="watchlist-header">Your watched listings</h1>
                            <ul className="watchlist-ul">
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
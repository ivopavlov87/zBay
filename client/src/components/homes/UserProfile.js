import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Timer from '../timer/timer';
import Queries from "../../graphql/queries";
import "./home_index.css";
import DeleteHome from "./DeleteHome";
import { useApolloClient } from "react-apollo-hooks";


const { FETCH_USER_HOMES, FETCH_USER_ID } = Queries;

const UserProfile = () => {
    const client = useApolloClient();
    const idPreSearch = client.readQuery({ query: FETCH_USER_ID });
    const idPostSearch = idPreSearch._id;
    if (idPostSearch === null) {
      return null;
    }

    // debugger;
        return (
            <Query query={FETCH_USER_HOMES} variables={{ id: idPostSearch}}>
                {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                // debugger;
                return (
                    <div className="home-index">
                    <div className="ul-container">
        
                        <ul className="homes-ul">
                        {data.userHomes.map(hm => {
                            // debugger;
                            // return home.map(hm => {
                            let maybeTimer;
                            if (hm.bids.length > 0){
                                maybeTimer = <Timer date={hm.bids[0].date} />
                            }
                            return <Link key={hm._id} to={`/homes/${hm._id}`}>
                                <li>
                                <div className="top-info">
                                    {/* house.photo it will be a backround*/}
                                    {/* button that addToWatchList this will probably be a function  */}
                                    {maybeTimer}
                                </div>
                                <div className="bottom-info">
                                    <h2>{hm.name}</h2>
                                    <h3>Click to See Listing</h3>
                                </div>
                                </li>
                            </ Link>
                            })}

                        
                        </ul>
                    </div>
                    </div>
                );
                }}
            </Query>
        )
    
};

export default UserProfile;
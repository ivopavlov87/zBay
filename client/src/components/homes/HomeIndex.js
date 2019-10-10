import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Map from "../map/map_view";
import Timer from '../timer/timer';
import Queries from "../../graphql/queries";
import "./home_index.css";
import DeleteHome from "./DeleteHome";


const { FETCH_HOMES, FETCH_RESULTS } = Queries;

const HomeIndex = ({cache}) => {

    return (
      <Query query={FETCH_RESULTS}>
         {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
  
          return (
            <div className="home-index">
              <Map homes={data.homes}/>
              <div className="ul-container">
  
                <ul className="homes-ul">
                  {data.results.map(home => {
                    return home.map(hm => {
                      let maybeTimer;
                      if (hm.bids.length > 0){
                        maybeTimer = <Timer date={hm.bids[0].date} />
                      }
                      return <Link key={hm._id} to={`/homes/${hm._id}`}>
                        <li>
                          <div className="top-info">

                            {maybeTimer}
                          </div>
                          <div className="bottom-info">
                            <h2>{hm.name}</h2>
                            <h3>Click to See Listing</h3>
                          </div>
                        </li>
                      </ Link>
                    })}

                  )}
                </ul>
              </div>
            </div>
          );
        }}
      </Query>
    )
  // }
};

export default HomeIndex;

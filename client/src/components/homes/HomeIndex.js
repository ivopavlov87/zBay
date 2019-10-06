import React from "react";
// import React, { Component } from "react";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Map from "../map/map_view"

import Queries from "../../graphql/queries";
import "./home_index.css"
const { FETCH_HOMES } = Queries;

const HomeIndex = () => {
  return (
    <Query query={FETCH_HOMES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div className="home-index">
            <Map />
            <div className="ul-container">

              <ul className="homes-ul">
                {data.homes.map(home => (
                  <Link key={home._id} to={`/homes/${home._id}`}>
                    <li>
                      <div className="top-info">
                        {/* house.photo it will be a backround*/}
                        {/* button that addToWatchList this will probably be a function  */}
                      </div>
                      <div className="bottom-info">
                        {home.name}
                        {/* house.info you know info*/}
                      </div>
                    </li>
                  </ Link>
                ))}
              </ul>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default HomeIndex;

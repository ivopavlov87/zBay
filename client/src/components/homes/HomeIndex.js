import React from "react";
import Slider from 'react-slick';
// import React, { Component } from "react";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Map from "../map/map_view";
import Timer from '../timer/timer';
import Queries from "../../graphql/queries";
import "./home_index.css";
import DeleteHome from "./DeleteHome";

import { Image } from 'cloudinary-react';


const { FETCH_HOMES, FETCH_RESULTS } = Queries;

const token2 = process.env.REACT_APP_TOKEN2

const HomeIndex = ({cache}) => {

  // if (cache.cache.data.data.ROOT_QUERY.results.json.length === 0){
  //   return (
  //     <Query query={FETCH_HOMES}>
  //       {({ loading, error, data }) => {
  //         if (loading) return "Loading...";
  //         if (error) return `Error! ${error.message}`;
  
  //         return (
  //           <div className="home-index">
  //             <Map />
  //             <div className="ul-container">
  
  //               <ul className="homes-ul">
  //                 {data.homes.map(home => (
  //                   <Link key={home._id} to={`/homes/${home._id}`}>
  //                     <li>
  //                       <div className="top-info">
  //                         {/* house.photo it will be a backround*/}
  //                         {/* button that addToWatchList this will probably be a function  */}
  //                       </div>
  //                       <div className="bottom-info">
  //                         <h2>{home.name}</h2>
  //                         <h3>Click to See Listing</h3>
  //                       </div>
  //                     </li>
  //                   </ Link>
  //                 ))}
  //               </ul>
  //             </div>
  //           </div>
  //         );
  //       }}
  //     </Query>
  //   );
  // } else {
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

                      const imageSettings = {
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        className: "index-slider",
                        adaptiveHeight: true,
                      }
                      
                      let images;
                      if (hm.images && hm.images.length > 0){
                        images = hm.images.map(image => {
                        return <div><Image className='index-image-slide' cloudName={token2} publicId={image} /></div>
                        })
                      } else {
                        images = <div>`there are no images for {hm.name}`</div>
                      }

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
                            <div className="home-index-detail-slideshow-container">
                            <Slider {...imageSettings}>
                              {images}
                            </Slider>
                            </div>
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

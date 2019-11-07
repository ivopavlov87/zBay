import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";


import Timer from '../timer/timer';
import Queries from "../../graphql/queries";

import { useApolloClient } from "react-apollo-hooks";

import { Image } from "cloudinary-react";
import Slider from "react-slick";
import DeleteHome from "./DeleteHome";
import Loading from "../loading/loading"



const { FETCH_USER_HOMES, FETCH_USER_ID } = Queries;

const token2 = process.env.REACT_APP_TOKEN2;





const UserProfile = () => {
  const client = useApolloClient();
  const idPreSearch = client.readQuery({ query: FETCH_USER_ID });
  const idPostSearch = idPreSearch._id;
  if (idPostSearch === null) {
    return null;
  }


  return (
    <Query query={FETCH_USER_HOMES} variables={{ id: idPostSearch }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading/>;
        if (error) return `Error! ${error.message}`;

        if (data.userHomes.length === 0){
          return (
            <div className="profile-container">
              <h1 className="profile-header">You haven't listed any homes for auction yet</h1>
              <h3>Click 'Create a Home' to list your home and view it here!</h3>
            </div>
          );
        } else {
          return (
            <div className="profile-container">
              <h1 className="profile-header">Your Homes</h1>
              <div className="user-ul-container">
                <ul className="profile-ul">
                  {data.userHomes.map((hm, i) => {
     
                    // return home.map(hm => {
                      const imageSettings = {
                        // centerMode: true,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        className: "index-slider",
                        adaptiveHeight: true,
                        fade: true,
                        cssEase: 'linear'
                      };

                      let images;
                      if (hm.images && hm.images.length > 0){
                          images = hm.images.map((image, i) => {
                          return <div key={i}><Image className='index-image-slide' cloudName={token2} publicId={image} /></div>
                          })
                        } else {
                          images = <div>`there are no images for {hm.name}`</div>
                        }

                    let maybeTimer;
                    // debugger;
                    if (hm.bids.length > 0) {
                      maybeTimer = <Timer date={hm.bids[0].date} />;
                    } else {
                      maybeTimer = <div className="timer-container" />
                    }
                    return <div className="profile-card" key={i}>
                        <Link key={hm._id} to={`/homes/${hm._id}`}>
                          <li>
                            <div className="profile-top">
                              {/* house.photo it will be a backround*/}
                              {/* button that addToWatchList this will probably be a function  */}
                              {maybeTimer}
                              <div className="profile-slideshow">
                                <Slider {...imageSettings}>{images}</Slider>
                              </div>
                            </div>
                            <div className="profile-bottom">
                              <h2>{hm.name}</h2>
                              {/* <h3>Click to See Listing</h3> */}
                            </div>
                          </li>
                        </Link>
                          <DeleteHome id={hm._id} />                        
                      </div>
                  })}
                </ul>
              </div>
            </div>
          );
        }
      }}
    </Query>
      
  );

    
};

export default UserProfile;
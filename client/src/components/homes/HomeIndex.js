import React from "react";
import Slider from 'react-slick';
// import { Query } from "react-apollo";
import { Link } from "react-router-dom";
// import Map from "../map/map_view";
import Timer from '../timer/timer';
import Queries from "../../graphql/queries";
import "./home_index.css";
import { Image } from 'cloudinary-react';

import { connect } from 'react-redux'
// const { FETCH_HOMES } = Queries;

const token2 = process.env.REACT_APP_TOKEN2

const msp = state => {
  return ({
    homes: Object.keys(state.homes).map(id => state.homes[id])
  })
}

class HomeIndex extends React.Component {



  render(){
    if (this.props.homes.length === 0) {
      return(
        <div className="ul-container">
          <ul className="homes-ul"></ul>
        </div>
      )
    }

    let { homes } = this.props;
 
    let homesList = homes.map(home => {
      const imageSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "index-slider",
        adaptiveHeight: true,
        fade: true,
        cssEase: 'linear'
      }
  
      let images;
      if (home.images && home.images.length > 0) {
        images = home.images.map((image, i) => {
          return <div key={i}><Image className='index-image-slide' cloudName={token2} publicId={image} /></div>
        })
      } else {
        images = <div>`there are no images for {home.name}`</div>
      }
  
      let maybeTimer;
      if (home.bids.length > 0) {
        maybeTimer = <Timer date={home.bids[0].date} />
      } else {
        maybeTimer = <div className="timer-container" />
      }
      return <Link key={home._id} to={`/homes/${home._id}`}>
        <li>
          <div className="top-info">

            {maybeTimer}
            <div className="home-index-detail-slideshow-container">
              <Slider {...imageSettings}>
                {images}
              </Slider>
            </div>
          </div>
          <div className="bottom-info">
            <h2>{home.name}</h2>
          
          </div>
        </li>
      </ Link>

    })

    return (
      <div className="ul-container">
        <ul className="homes-ul">{homesList}</ul>
      </div>
    )
  }
};

export default connect(msp)(HomeIndex);

import React from "react";
import Slider from 'react-slick';
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import Mutations from "../../graphql/mutations"
import Queries from "../../graphql/queries";
import BidShow from '../bids/BidShow';
import Timer from '../timer/timer';
import { Image } from 'cloudinary-react';
import AddButtonContainer from "../watchlist/AddButtonContainer";
import Loading from "../loading/loading"


const { FETCH_HOME, FETCH_BIDS, IS_LOGGED_IN } = Queries;
const { CREATE_BID } = Mutations;
const token2 = process.env.REACT_APP_TOKEN2


class HomeDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      homeId: this.props.match.params.id,
      amount: "",
      message: ""
    }
  }


  update(field){
    return (e) => {
      this.setState({ [field]: e.target.value })
    }
  }

  updateCache(cache, { data }) {
    let bids;
    try {

      bids = cache.readQuery({ query: FETCH_BIDS });
    } catch (err) {
      return;
    }

    if (bids) {
      let bidsArray = bids.bids;
      let createBid = data.createBid;
      cache.writeQuery({
        query: FETCH_BIDS,
        data: { bids: bidsArray.concat(createBid) }
      });
    }
  }

  handleSubmit(e, func){
    e.preventDefault();
    func({
      variables: {
      homeId: this.state.homeId,
      amount: parseInt(this.state.amount),
      }
    }).then(() => this.setState({ amount: ""}))
  }
  
  render() {

    const imageSettings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: "detail-slider",
      adaptiveHeight: true,
      fade: true,
      cssEase: 'linear'
    }

    return (
      <div>
      <Query query={FETCH_HOME} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading/>;
          if (error) return `Error! ${error.message}`;

          let conditionalTimer = "";
      
          if (data.home.bids.length !== 0){
            let bidTime = data.home.bids[0].date
            conditionalTimer = <div><Timer date={bidTime} /></div>
          }

          const images = data.home.images.map((image, i) => {
            return <div key={i}><Image className='image-slide' cloudName={token2} publicId={image} /></div>
          });
         
          return (
            <div className="home-show-container">
                <h1 className="show-info-title">{data.home.name}</h1>
             
              <div className="home-show">
                <div className="show-pics-col">
                  <div className="home-detail-slideshow-container">

                    <Slider {...imageSettings}>
                      {images}
                      </Slider>

                  </div>
                  

                <BidShow bids={data.home.bids} />
                </div>
                <div className="show-info-col">
                  <div className="show-bidding-box">
                    {conditionalTimer}
                    <Mutation
                      mutation={CREATE_BID}
                      onError={err => this.setState({ message: err.message })}
                      refetchQueries={() => {
                        return [
                          {
                            query: FETCH_HOME,
                            variables: { id: this.props.match.params.id }
                          }
                        ];
                      }}
                      update={(cache, data) => this.updateCache(cache, data)}
        
                      onCompleted={data => {
             
                        this.setState({
                          message: `Bid placed successfully`
                        });
                      }}
                    >
                      {(createBid, { data }) => (
                        
                        <div className="bid-form-container">
                          <form className="bid-form" onSubmit={e => this.handleSubmit(e, createBid)}>
                            <h3 className="enter-bid-header">Enter a bid for this home:</h3>
                            <input className="bid-input" type="number" value={this.state.amount} onChange={this.update('amount')}/>&nbsp;&nbsp;
                            <input className="bid-submit" type="submit" value="Bid Now"/>
                          </form>
                          <div className="bid-success">
                            <h5>{this.state.message}</h5>
                          </div>
                        </div>
                      )}
                    </Mutation>
                    
                  </div>
                  <div className="show-home-wrapper">
                    <div className="show-home-location">
                      <h5 className="show-info-text">{data.home.streetAddress},</h5>
                      <h5 className="show-info-text">{data.home.city},</h5>
                      <h5 className="show-info-text">{data.home.state}, </h5>
                      <h5 className="show-info-text">{data.home.zipcode}</h5>
                    </div>
                    <div className="show-home-info">
                      <h5 className="show-info-text">Year built: {data.home.yearBuilt}</h5>
                      <h5 className="show-info-text">House price: {data.home.price}</h5>
                      <h5 className="show-info-text">{data.home.sqft} sqft.</h5>
                      <h5 className="show-info-text">{data.home.stories} stories</h5>
                      <h5 className="show-info-text">{data.home.bathrooms}  bathrooms</h5>
                      <h5 className="show-info-text">{data.home.bedrooms} bedrooms</h5>
                    </div>
                  </div>
                  <div className="show-info-box" key={data.home._id}>
                    <div className="show-home-bio">
                      
                      <h2 className="show-info-text">{data.home.description}</h2>
                    </div>
                  </div>
                  <Query query={IS_LOGGED_IN}>
                    {(response) => {
                      if (response.data.isLoggedIn) {
                        return (
                          <AddButtonContainer homeId={data.home._id} />
                        )
                      } else {
                        return (
                          <button className="add-watchlist">Log in to use Watchlist</button>
                        )
                      }
                    }}
                  </Query>
                </div>
              </div>
               <Link className="back-to-home-link" to="/">Back to Home</Link>
               <br/>

            </div>
          );
        }}
      </Query>
    
      </div>
    );
  };
}
export default HomeDetail;
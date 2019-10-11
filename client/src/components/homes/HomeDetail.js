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

const { FETCH_HOME, FETCH_BIDS } = Queries;
const { CREATE_BID, ADD_HOME } = Mutations;

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

 
  // just some useless comments here, some more comments

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
    }

    return (
      <Query query={FETCH_HOME} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return <div className="loading">Loading...</div>;
          if (error) return `Error! ${error.message}`;

          let conditionalTimer = "";
      
          if (data.home.bids.length !== 0){
            let bidTime = data.home.bids[0].date
            conditionalTimer = <div><Timer date={bidTime} /></div>
          }

          const images = data.home.images.map(image => {
            return <div><Image className='image-slide' cloudName={token2} publicId={image} /></div>
          });
         
          return (
            <div className="home-show-container">
             
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
                            <input className="bid-input" type="number" value={this.state.amount} onChange={this.update('amount')}/>
                            <input className="bid-submit" type="submit" value="Bid Now"/>
                          </form>
                            {/* <input className="bid-submit" type="submit" value="Add to Watchlist"/> */}
                          <div className="bid-success">
                            <h5>{this.state.message}</h5>
                          </div>
                        </div>
                      )}
                    </Mutation>
                    <AddButtonContainer homeId={data.home._id}/>
                  </div>
                  <div className="show-info-box" key={data.home._id}>
                    <h1 className="show-info-text">{data.home.name}</h1>
                    <h2 className="show-info-text">{data.home.description}</h2>
                    <h5 className="show-info-text">Year built: {data.home.yearBuilt}</h5>
                    <h5 className="show-info-text">Starting price: {data.home.price}</h5>
                    <h5 className="show-info-text">{data.home.streetAddress}</h5>
                    <h5 className="show-info-text">{data.home.city}</h5>
                    <h5 className="show-info-text">{data.home.state}</h5>
                    <h5 className="show-info-text">{data.home.zipcode}</h5>
                    <h5 className="show-info-text">{data.home.sqft} sqft.</h5>
                    <h5 className="show-info-text">{data.home.stories} stories</h5>
                    <h5 className="show-info-text">{data.home.bathrooms}  bathrooms</h5>
                    <h5 className="show-info-text">{data.home.bedrooms} bedrooms</h5>
                  
                  </div>
                </div>
              </div>
               <Link className="back-to-home-link" to="/">Back to Home</Link>
               <br/>

            </div>
          );
        }}
      </Query>
    );
  };
}
export default HomeDetail;
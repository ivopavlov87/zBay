import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import Mutations from "../../graphql/mutations"
import Queries from "../../graphql/queries";
const { FETCH_HOME, FETCH_BIDS } = Queries;
const { CREATE_BID } = Mutations;

class HomeDetail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      homeId: this.props.match.params.id,
      amount: 1,
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
    // if we had previously fetched homes we'll add our new home to our cache
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
    })
  }
  
  render() {

    return (
      <Query query={FETCH_HOME} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="home-show-container">
              <Link className="back-to-home-link" to="/"> {'<--'} Back to home</Link>
              <div className="home-show">
                <div className="show-pics-col">
                  Photo
                </div>
                <div className="show-info-col">
                  <div className="show-info-box" key={data.home._id}>
                    <h3>{data.home.name}</h3>
                  
                    <h5>{data.home.description}</h5>
                    <h5>Year built: {data.home.yearBuilt}</h5>
                    <h5>{data.home.streetAddress}</h5>
                    <h5>{data.home.city}</h5>
                    <h5>{data.home.state}</h5>
                    <h5>{data.home.zipcode}</h5>
                    <h5>{data.home.sqft} sqft.</h5>
                    <h5>{data.home.stories} stories</h5>
                    <h5>{data.home.bathrooms}  bathrooms</h5>
                    <h5>{data.home.bedrooms} bedrooms</h5>
                  
                  </div>
                  <div className="show-bidding-box">
                    <Mutation
                      mutation={CREATE_BID}
                      onError={err => this.setState({ message: err.message })}
                     
                      update={(cache, data) => this.updateCache(cache, data)}
        
                      onCompleted={data => {
                        // const { amount } = data.createBid;
                        this.setState({
                          message: `Bid placed successfully`
                        });
                      }}
                    >
                      {(createBid, { data }) => (
                        <div>
                          <form onSubmit={e => this.handleSubmit(e, createBid)}>
                            <input type="number" value={this.state.amount} onChange={this.update('amount')}/>
                            <input type="submit" value="Bid Now"/>
                          </form>
                          <h5>{this.state.message}</h5>
                        </div>
                      )}
                    </Mutation>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  };
}
export default HomeDetail;
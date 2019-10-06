import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Queries from "../../graphql/queries";
const { FETCH_HOME } = Queries;

class HomeDetail extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  
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
                    {/* secondary info/ bidding button? */}
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
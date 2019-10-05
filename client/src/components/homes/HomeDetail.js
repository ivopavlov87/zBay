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
            <div>
              <Link to="/">Homes Index</Link>
              <div>
                <p key={data.home._id}>
                {data.home.name}
                &nbsp;-&nbsp;
                {data.home.description}
                &nbsp;-&nbsp;
                Year Built: {data.home.yearBuilt}
                &nbsp;-&nbsp;
                {data.home.streetAddress}
                &nbsp;-&nbsp;
                {data.home.city}
                &nbsp;-&nbsp;
                {data.home.state}
                &nbsp;-&nbsp;
                {data.home.zipcode}
                &nbsp;-&nbsp;
                {data.home.sqft} sqft.
                &nbsp;-&nbsp;
                {data.home.stories} stories
                &nbsp;-&nbsp;
                {data.home.bathrooms} bathrooms
                &nbsp;-&nbsp;
                {data.home.bedrooms} bedrooms</p>
              </div>
            </div>
          );
        }}
      </Query>
    );
  };
}
export default HomeDetail;
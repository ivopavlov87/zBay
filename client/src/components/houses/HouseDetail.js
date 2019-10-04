import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import Queries from "../../graphql/queries";
const { FETCH_HOUSE } = Queries;

class HouseDetail extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  
  render() {
    return (
      <Query query={FETCH_HOUSE} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <Link to="/">Houses Index</Link>
              <div>
                <p key={data.house._id}>
                {data.house.name}
                &nbsp;-&nbsp;
                {data.house.description}
                &nbsp;-&nbsp;
                {data.house.sqft} sqft.
                &nbsp;-&nbsp;
                {data.house.bathrooms} bathrooms</p>
              </div>
            </div>
          );
        }}
      </Query>
    );
  };
}
export default HouseDetail;
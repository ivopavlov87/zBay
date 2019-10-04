import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { CREATE_HOUSE } = Mutations;
const { FETCH_HOUSES } = Queries;

class CreateHouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      name: "",
      sqft: "",
      description: "",
      bathrooms: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // we need to remember to update our cache directly with our new house
  updateCache(cache, { data }) {
    let houses;
    try {
      // if we've already fetched the houses then we can read the
      // query here
      houses = cache.readQuery({ query: FETCH_HOUSES });
    } catch (err) {
      return;
    }
    // if we had previously fetched houses we'll add our new house to our cache
    if (houses) {
      let houseArray = houses.houses;
      let newHouse = data.newHouse;
      cache.writeQuery({
        query: FETCH_HOUSES,
        data: { houses: houseArray.concat(newHouse) }
      });
    }
  }

  handleSubmit(e, newHouse) {
    e.preventDefault();
    newHouse({
      variables: {
        name: this.state.name,
        description: this.state.description,
        sqft: parseInt(this.state.sqft),
        bathrooms: parseFloat(this.state.bathrooms)
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_HOUSE}
        // if we error out we can set the message here
        onError={err => this.setState({ message: err.message })}
        // we need to make sure we update our cache once our new house is created
        update={(cache, data) => this.updateCache(cache, data)}
        // when our query is complete we'll display a success message
        onCompleted={data => {
          const { name } = data.newHouse;
          this.setState({
            message: `New house ${name} created successfully`
          });
        }}
      >
        {(newHouse, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newHouse)}>
              <input
                onChange={this.update("name")}
                value={this.state.name}
                placeholder="Name"
              />
              <textarea
                onChange={this.update("description")}
                value={this.state.description}
                placeholder="description"
              />
              <input
                onChange={this.update("sqft")}
                value={this.state.sqft}
                placeholder="Square footage"
              />
              <input
                onChange={this.update("bathrooms")}
                value={this.state.bathrooms}
                placeholder="Number of bathrooms"
              />
              <button type="submit">Create House</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateHouse;

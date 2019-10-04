import React, { Component } from "react";
import { Mutation } from "react-apollo";

import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { CREATE_HOME } = Mutations;
const { FETCH_HOMES } = Queries;

class CreateHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      name: "",
      sqft: "",
      stories: "",
      description: "",
      bathrooms: "",
      bedrooms: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // we need to remember to update our cache directly with our new home
  updateCache(cache, { data }) {
    let homes;
    try {
      // if we've already fetched the homes then we can read the
      // query here
      homes = cache.readQuery({ query: FETCH_HOMES });
    } catch (err) {
      return;
    }
    // if we had previously fetched homes we'll add our new home to our cache
    if (homes) {
      let homeArray = homes.homes;
      let newHome = data.newHome;
      cache.writeQuery({
        query: FETCH_HOMES,
        data: { homes: homeArray.concat(newHome) }
      });
    }
  }

  handleSubmit(e, newHome) {
    e.preventDefault();
    newHome({
      variables: {
        name: this.state.name,
        description: this.state.description,
        sqft: parseInt(this.state.sqft),
        stories: parseInt(this.state.stories),
        bedrooms: parseInt(this.state.bedrooms),
        bathrooms: parseFloat(this.state.bathrooms)
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_HOME}
        // if we error out we can set the message here
        onError={err => this.setState({ message: err.message })}
        // we need to make sure we update our cache once our new home is created
        update={(cache, data) => this.updateCache(cache, data)}
        // when our query is complete we'll display a success message
        onCompleted={data => {
          const { name } = data.newHome;
          this.setState({
            message: `New home ${name} created successfully`
          });
        }}
      >
        {(newHome, { data }) => (
          <div>
            <form onSubmit={e => this.handleSubmit(e, newHome)}>
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
              <input
                onChange={this.update("stories")}
                value={this.state.stories}
                placeholder="Number of stories"
              />
              <input
                onChange={this.update("bedrooms")}
                value={this.state.bedrooms}
                placeholder="Number of bedrooms"
              />
              <button type="submit">Create Home</button>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateHome;

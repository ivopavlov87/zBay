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
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      sqft: "",
      stories: "",
      description: "",
      bathrooms: "",
      bedrooms: "",
      yearBuilt: "",
      garage: false,
      basement: false,
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
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        state: this.state.state,
        zipcode: parseInt(this.state.zipcode),
        description: this.state.description,
        sqft: parseInt(this.state.sqft),
        yearBuilt: parseInt(this.state.yearBuilt),
        stories: parseInt(this.state.stories),
        bedrooms: parseInt(this.state.bedrooms),
        bathrooms: parseFloat(this.state.bathrooms),
        garage: this.state.garage,
        basement: this.state.basement
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
              <input
                onChange={this.update("streetAddress")}
                value={this.state.streetAddress}
                placeholder="Street Address"
              />
              <input
                onChange={this.update("city")}
                value={this.state.city}
                placeholder="City"
              />
              <select
                className="state-select-dropdown"
                value={this.state.state}
                onChange={this.update("state")}>
                  <option defaultValue>State</option>
                  <option value="AK">AK - Alaska</option>
                  <option value="AL">AL - Alabama</option>
                  <option value="AR">AR - Arkansas</option>
                  <option value="AS">AS - American Somoa</option>
                  <option value="AZ">AZ - Arizona</option>
                  <option value="CA">CA - California</option>
                  <option value="CO">CO - Colorado</option>
                  <option value="CT">CT - Connecticut</option>
                  <option value="DC">DC - District of Columbia</option>
                  <option value="DE">DE - Delaware</option>
                  <option value="FL">FL - Florida</option>
                  <option value="GA">GA - Georgia</option>
                  <option value="GU">GU - Guam</option>
                  <option value="HI">HI - Hawaii</option>
                  <option value="IA">IA - Iowa</option>
                  <option value="ID">ID - Idaho</option>
                  <option value="IL">IL - Illinois</option>
                  <option value="IN">IN - Indiana</option>
                  <option value="KS">KS - Kansas</option>
                  <option value="KY">KY - Kentucky</option>
                  <option value="LA">LA - Louisiana</option>
                  <option value="MA">MA - Massachusetts</option>
                  <option value="MD">MD - Maryland</option>
                  <option value="ME">ME - Maine</option>
                  <option value="MI">MI - Michigan</option>
                  <option value="MN">MN - Minnesota</option>
                  <option value="MO">MO - Missouri</option>
                  <option value="MS">MS - Mississippi</option>
                  <option value="MT">MT - Montana</option>
                  <option value="NC">NC - North Carolina</option>
                  <option value="ND">ND - North Dakota</option>
                  <option value="NE">NE - Nebraska</option>
                  <option value="NH">NH - New Hampshire</option>
                  <option value="NJ">NJ - New Jerey</option>
                  <option value="NM">NM - New Mexico</option>
                  <option value="NV">NV - Nevada</option>
                  <option value="NY">NY - New York</option>
                  <option value="OH">OH - Ohio</option>
                  <option value="OK">OK - Oklahoma</option>
                  <option value="OR">OR - Oregon</option>
                  <option value="PA">PA - Pennsylvania</option>
                  <option value="PR">PR - Puerto Rico</option>
                  <option value="RI">RI - Rhode Island</option>
                  <option value="SC">SC - South Carolina</option>
                  <option value="SD">SD - South Dakota</option>
                  <option value="TN">TN - Tennessee</option>
                  <option value="TX">TX - Texas</option>
                  <option value="UT">UT - Utah</option>
                  <option value="VA">VA - Virginia</option>
                  <option value="VI">VI - Virgin Islands</option>
                  <option value="VT">VT - Vermont</option>
                  <option value="WA">WA - Washington</option>
                  <option value="WI">WI - Wisconsin</option>
                  <option value="WV">WV - West Virginia</option>
                  <option value="WY">WY - Wyoming</option>
              </select>
              <input
                onChange={this.update("zipcode")}
                value={this.state.zipcode}
                placeholder="Zipcode"
              />
              <input
                onChange={this.update("yearBuilt")}
                value={this.state.yearBuilt}
                placeholder="Year built"
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
              <div>
                <input type="checkbox" value="garage" onChange={() => this.setState(prevState => ({garage: !prevState.garage}))}/>
                <label>Garage</label>
              </div>
              <div>
                <input type="checkbox" value="basement" onChange={() => this.setState(prevState => ({basement: !prevState.basement}))}/>
                <label>Basement</label>
              </div>
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

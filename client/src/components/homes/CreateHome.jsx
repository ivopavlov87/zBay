import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Dropzone from 'react-dropzone'
import { uploadImage } from "../../util/image_api_util";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { CREATE_HOME } = Mutations;
const { FETCH_HOMES } = Queries;


const token2 = process.env.REACT_APP_TOKEN2
const token3 = process.env.REACT_APP_TOKEN3

// debugger;


class CreateHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      searchField: "",
      pictures: [],
      images: []
    };

    this.files = [];
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleOnDrop(files, rejectedFiles) {
  //   console.log(files)
  //   console.log('rejected files are', rejectedFiles)

  //   files.forEach(file => {
  //     const imageObj = new FormData();
  //     imageObj.append('image', file);
  //     let newPictures = this.state.pictures.slice();
  //     newPictures.push(imageObj);
  //     this.setState({pictures: newPictures})
  //   })
  // }

  handleOnDrop(e) {
    e.preventDefault();
    const files = Array.from(e.target.files);
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
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

  handleFileSelect(files) {
    console.log(files);
  }

  async updateImageURLs() {
    const publicIdsArray = [];
    for (let i = 0; i < this.files.length; i++) {
      const formData = new FormData();
      formData.append('file', this.files[i]);
      formData.append('upload_preset', token3);
      const image = await axios.post(
        `https://api.cloudinary.com/v1_1/${token2}/image/upload`,
        formData
      )

      publicIdsArray.push(image.data.public_id);
    }
    return publicIdsArray;
  }

  handleSubmit(e, newHome) {
    e.preventDefault();

    const garagePresent = this.state.garage ? "Garage" : "";
    const basementPresent = this.state.basement ? "Basement" : "";

    this.updateImageURLs().then(images => {
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
        basement: this.state.basement,
        images: images,
        searchField: `${this.state.name} ${this.state.streetAddress} ${this.state.city} ${this.state.state} ${this.state.zipcode} ${this.state.description} ${this.state.sqft}sqft ${this.state.yearBuilt} ${this.state.stories}stories ${this.state.bedrooms}bedrooms ${this.state.bathrooms}bathrooms ${garagePresent} ${basementPresent}`
      }
      }).then(response => {
        this.setState({
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
          searchField: "",
          // pictures: [],
          images: []
        });
        this.files = [];
        this.props.history.push(`/homes/${newHome.id}`)
      })
    })
  }

  //   newHome({
  //     variables: {
  //       name: this.state.name,
  //       streetAddress: this.state.streetAddress,
  //       city: this.state.city,
  //       state: this.state.state,
  //       zipcode: parseInt(this.state.zipcode),
  //       description: this.state.description,
  //       sqft: parseInt(this.state.sqft),
  //       yearBuilt: parseInt(this.state.yearBuilt),
  //       stories: parseInt(this.state.stories),
  //       bedrooms: parseInt(this.state.bedrooms),
  //       bathrooms: parseFloat(this.state.bathrooms),
  //       garage: this.state.garage,
  //       basement: this.state.basement,
  //       images: images,
  //       searchField: `${this.state.name} ${this.state.streetAddress} ${this.state.city} ${this.state.state} ${this.state.zipcode} ${this.state.description} ${this.state.sqft}sqft ${this.state.yearBuilt} ${this.state.stories}stories ${this.state.bedrooms}bedrooms ${this.state.bathrooms}bathrooms ${garagePresent} ${basementPresent}`
  //     }
  //   }).then(payload => {
  //     const newHomeId = payload.data.newHome._id;

  //     this.state.pictures.forEach(image => {
  //       image.append('homeId', newHomeId)
  //       uploadImage(image);
  //     })
  //   })
  // }

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
          <div className="create-form-container">
            <h1 className="create-form-header">Enter the details for your new listing:</h1>
            <form className="create-form" onSubmit={e => this.handleSubmit(e, newHome)}>
              <div className="create-form-left">
                <input className="create-input"
                  onChange={this.update("name")}
                  value={this.state.name}
                  placeholder="Name"
                />
                <input className="create-input"
                  onChange={this.update("streetAddress")}
                  value={this.state.streetAddress}
                  placeholder="Street Address"
                />
                <input className="create-input"
                  onChange={this.update("city")}
                  value={this.state.city}
                  placeholder="City"
                />
                <select className="create-input"
                  // className="state-select-dropdown"
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
                <input className="create-input"
                  onChange={this.update("zipcode")}
                  value={this.state.zipcode}
                  placeholder="Zipcode"
                />
                <input className="create-input"
                  type="number"
                  onChange={this.update("yearBuilt")}
                  value={this.state.yearBuilt}
                  placeholder="Year built"
                  min="1901"
                  max="2019"
                  step="1"
                />
                <input className="create-input"
                  onChange={this.update("sqft")}
                  value={this.state.sqft}
                  placeholder="Square footage"
                />
              </div>
              <div className="create-form-right">
                <textarea className="create-input"
                  onChange={this.update("description")}
                  value={this.state.description}
                  placeholder="Description"
                />
                
                <input className="create-input"
                  type="number"
                  min="1"
                  step="0.5"
                  onChange={this.update("bathrooms")}
                  value={this.state.bathrooms}
                  placeholder="Number of bathrooms"
                />
                <input className="create-input"
                  onChange={this.update("stories")}
                  value={this.state.stories}
                  placeholder="Number of stories"
                />
                <input className="create-input"
                  type="number"
                  min="0"
                  step="1"
                  onChange={this.update("bedrooms")}
                  value={this.state.bedrooms}
                  placeholder="Number of bedrooms"
                />
                <div className="create-checkbox">
                  <input  type="checkbox" value="garage" onChange={() => this.setState(prevState => ({garage: !prevState.garage}))}/>
                  <label>Garage</label>
                </div>
                <div className="create-checkbox">
                  <input type="checkbox" value="basement" onChange={() => this.setState(prevState => ({basement: !prevState.basement}))}/>
                  <label>Basement</label>
                </div>
              {/* <div>
                <Dropzone onDrop={this.handleOnDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div> */}
                <div>
                <label>
                  Add Images: &nbsp;
                  <input type="file" multiple onChange={this.handleOnDrop} />
                </label>
              </div>
                <button className="create-submit" type="submit">Create Home</button>
              </div>
            </form>
            <p>{this.state.message}</p>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CreateHome);

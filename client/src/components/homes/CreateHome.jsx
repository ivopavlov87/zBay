import React, { Component } from "react";
import { Mutation } from "react-apollo";
// import Dropzone from 'react-dropzone'
// import { uploadImage } from "../../util/image_api_util";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
const { CREATE_HOME } = Mutations;
const { FETCH_HOMES } = Queries;
const mapToken = process.env.REACT_APP_TOKEN



const token2 = process.env.REACT_APP_TOKEN2
const token3 = process.env.REACT_APP_TOKEN3


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
      coordinates: [],
      viewport: {},
      price: "",
      // pictures: [],
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


  updateCache(cache, { data }) {
    let homes;
    let viewport = this.state.viewport
    try {

      homes = cache.readQuery({ query: FETCH_HOMES });
    } catch (err) {
      return;
    }

    if (homes) {
      let homeArray = homes.homes;
      let newHome = data.newHome;
      cache.writeQuery({
        query: FETCH_HOMES,
        data: { homes: homeArray.concat(newHome), viewport: viewport }
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

  async handleSubmit(e, newHome) {
    e.preventDefault();

    const garagePresent = this.state.garage ? "Garage" : "";
    const basementPresent = this.state.basement ? "Basement" : "";
    let inputValue = `${this.state.zipcode} ${this.state.streetAddress}`
    await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${mapToken}`)
    .then(response => response.json())
    .then(data => {
       return this.setState({ viewport: data.features[0], coordinates: data.features[0].geometry.coordinates})
      });
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
        price: parseInt(this.state.price),
        stories: parseInt(this.state.stories),
        bedrooms: parseInt(this.state.bedrooms),
        bathrooms: parseFloat(this.state.bathrooms),
        garage: this.state.garage,
        basement: this.state.basement,
        coordinates: this.state.coordinates,
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
          price: "",
          // pictures: [],
          images: []
        });
        this.files = [];
        // debugger;
        // if (response && response.data) {
        this.props.history.push(`/homes/${response.data.newHome._id}`)
        // } else {
          // console.log("response was undefined")
        // }
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
            message: `New listing: ${name}, created successfully`
          });
        }}
      >
        {(newHome, { data }) => (
          <div className="create-form-wrapper">
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
                  <select className="create-input-state"
                    // className="state-select-dropdown"
                    value={this.state.state}
                    onChange={this.update("state")}>
                      <option defaultValue>State</option>
                      <option value="Alaska">AK - Alaska</option>
                      <option value="Alabama">AL - Alabama</option>
                      <option value="Arkansas">AR - Arkansas</option>
                      <option value="Somoa">AS - Somoa</option>
                      <option value="Arizona">AZ - Arizona</option>
                      <option value="California">CA - California</option>
                      <option value="Colorado">CO - Colorado</option>
                      <option value="Connecticut">CT - Connecticut</option>
                      <option value="District of Columbia">DC - District of Columbia</option>
                      <option value="Delaware">DE - Delaware</option>
                      <option value="Florida">FL - Florida</option>
                      <option value="Georgia">GA - Georgia</option>
                      <option value="Guam">GU - Guam</option>
                      <option value="Hawaii">HI - Hawaii</option>
                      <option value="Iowa">IA - Iowa</option>
                      <option value="Idaho">ID - Idaho</option>
                      <option value="Illinois">IL - Illinois</option>
                      <option value="Indiana">IN - Indiana</option>
                      <option value="Kansas">KS - Kansas</option>
                      <option value="Kentucky">KY - Kentucky</option>
                      <option value="Louisiana">LA - Louisiana</option>
                      <option value="Massachusetts">MA - Massachusetts</option>
                      <option value="Maryland">MD - Maryland</option>
                      <option value="Maine">ME - Maine</option>
                      <option value="Michigan">MI - Michigan</option>
                      <option value="Minnesota">MN - Minnesota</option>
                      <option value="Missouri">MO - Missouri</option>
                      <option value="Mississippi">MS - Mississippi</option>
                      <option value="Montana">MT - Montana</option>
                      <option value="North Carolina">NC - North Carolina</option>
                      <option value="North Dakota">ND - North Dakota</option>
                      <option value="Nebraska">NE - Nebraska</option>
                      <option value="New Hampshire">NH - New Hampshire</option>
                      <option value="New Jerey">NJ - New Jerey</option>
                      <option value="New Mexico">NM - New Mexico</option>
                      <option value="Nevada">NV - Nevada</option>
                      <option value="New York">NY - New York</option>
                      <option value="Ohio">OH - Ohio</option>
                      <option value="Oklahoma">OK - Oklahoma</option>
                      <option value="Oregon">OR - Oregon</option>
                      <option value="Pennsylvania">PA - Pennsylvania</option>
                      <option value="Puerto Rico">PR - Puerto Rico</option>
                      <option value="Rhode Island">RI - Rhode Island</option>
                      <option value="South Carolina">SC - South Carolina</option>
                      <option value="South Dakota">SD - South Dakota</option>
                      <option value="Tennessee">TN - Tennessee</option>
                      <option value="Texas">TX - Texas</option>
                      <option value="Utah">UT - Utah</option>
                      <option value="Virginia">VA - Virginia</option>
                      <option value="British Virgin Islands">VI - Virgin Islands</option>
                      <option value="Vermont">VT - Vermont</option>
                      <option value="Washington">WA - Washington</option>
                      <option value="Wisconsin">WI - Wisconsin</option>
                      <option value="West Virginia">WV - West Virginia</option>
                      <option value="Wyoming">WY - Wyoming</option>
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
                    type="number"
                    onChange={this.update("sqft")}
                    value={this.state.sqft}
                    placeholder="Square footage"
                  />
                  <input className="create-input"
                    type="number"
                    onChange={this.update("price")}
                    value={this.state.price}
                    placeholder="Starting price"
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
                    Add Images: <br/>
                    <input type="file" multiple onChange={this.handleOnDrop} />
                  </label>
                </div>
                  <button className="create-submit" type="submit">Create Home</button>
                </div>
              </form>
              <p>{this.state.message}</p>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CreateHome);

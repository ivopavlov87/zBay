// import React, { Component } from "react";
// import { Mutation } from "react-apollo";

// import axios from 'axios';
// import { withRouter } from 'react-router-dom';

// import Mutations from "../../graphql/mutations";
// import Queries from "../../graphql/queries";
// const { UPDATE_HOME } = Mutations;
// const { FETCH_HOMES } = Queries;

// const mapToken = process.env.REACT_APP_TOKEN

// const token2 = process.env.REACT_APP_TOKEN2
// const token3 = process.env.REACT_APP_TOKEN3

// class UpdateHome extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editing: false,
//       message: "",
//       name: this.props.name || "",
//       streetAddress: this.props.streetAddress || "",
//       city: this.props.city || "",
//       state: this.props.state || "",
//       zipcode: this.props.zipcode || "",
//       sqft: this.props.sqft || "",
//       stories: this.props.stories || "",
//       description: this.props.description || "",
//       bathrooms: this.props.bathrooms || "",
//       bedrooms: this.props.bedrooms || "",
//       yearBuilt: this.props.yearBuilt || "",
//       garage: this.props.garage || false,
//       basement: this.props.basement || false,
//       images: this.props.images || [],
//       coordinates: this.props.coordinates || [],
//       price: this.props.price || "",
//       viewport: this.props.viewport || {},
//       searchField: this.props.searchField || ""
//     };

//     this.files = [];
//     // this.handleOnDrop = this.handleOnDrop(this);
//     this.handleEdit = this.handleEdit.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleEdit(e) {
//     e.preventDefault();
//     this.setState({ editing: true });
//   }

//   // handleOnDrop(e) {
//   //   e.preventDefault();
//   //   const files = Array.from(e.target.files);
//   //   for (let i = 0; i < files.length; i++) {
//   //     this.files.push(files[i]);
//   //   }
//   // }

//   update(field) {
//     return e => this.setState({ [field]: e.target.value });
//   }

//   // we need to remember to update our cache directly with our home
//   updateCache(cache, { data }) {
//     let homes;
//     let viewport = this.state.viewport
//     try {
//       // if we've already fetched the homes then we can read the
//       // query here
//       homes = cache.readQuery({ query: FETCH_HOMES });
//     } catch (err) {
//       return;
//     }
//     // if we had previously fetched homes we'll add our home to our cache
//     if (homes) {
//       let homeArray = homes.homes;
//       let updateHome = data.updateHome;
//       cache.writeQuery({
//         query: FETCH_HOMES,
//         data: { homes: homeArray.concat(updateHome), viewport: viewport }
//       });
//     }
//   }

//   handleFileSelect(files) {
//     console.log(files);
//   }

//   async updateImageURLs() {
//     const publicIdsArray = [];
//     for (let i = 0; i < this.files.length; i++) {
//       const formData = new FormData();
//       formData.append('file', this.files[i]);
//       formData.append('upload_preset', token3);
//       const image = await axios.post(
//         `https://api.cloudinary.com/v1_1/${token2}/image/upload`,
//         formData
//       )
//       publicIdsArray.push(image.data.public_id);
//     }
//     return publicIdsArray;
//   }

//   // async handleSubmit(e, updatedHome) {
//   //   e.preventDefault();
//   //   let geocoderResults = [];

//   //   const garagePresent = this.state.garage ? "Garage" : "";
//   //   const basementPresent = this.state.basement ? "Basement" : "";
//   //   let inputValue = `${this.state.zipcode} ${this.state.streetAddress}`
//   //   await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${mapToken}`)
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       return this.setState({ viewport: data.features[0], coordinates: data.features[0].geometry.coordinates })
//   //     });
//   //   this.updateImageURLs().then(images => {
//   //     updatedHome({
//   //       variables: {
//   //         name: this.state.name,
//   //         streetAddress: this.state.streetAddress,
//   //         city: this.state.city,
//   //         state: this.state.state,
//   //         zipcode: parseInt(this.state.zipcode),
//   //         description: this.state.description,
//   //         sqft: parseInt(this.state.sqft),
//   //         yearBuilt: parseInt(this.state.yearBuilt),
//   //         price: parseInt(this.state.price),
//   //         stories: parseInt(this.state.stories),
//   //         bedrooms: parseInt(this.state.bedrooms),
//   //         bathrooms: parseFloat(this.state.bathrooms),
//   //         garage: this.state.garage,
//   //         basement: this.state.basement,
//   //         coordinates: this.state.coordinates,
//   //         images: images,
//   //         searchField: `${this.state.name} ${this.state.streetAddress} ${this.state.city} ${this.state.state} ${this.state.zipcode} ${this.state.description} ${this.state.sqft}sqft ${this.state.yearBuilt} ${this.state.stories}stories ${this.state.bedrooms}bedrooms ${this.state.bathrooms}bathrooms ${garagePresent} ${basementPresent}`
//   //       }
//   //     }).then(response => {
//   //       this.setState({
//   //         name: "",
//   //         streetAddress: "",
//   //         city: "",
//   //         state: "",
//   //         zipcode: "",
//   //         sqft: "",
//   //         stories: "",
//   //         description: "",
//   //         bathrooms: "",
//   //         bedrooms: "",
//   //         yearBuilt: "",
//   //         garage: false,
//   //         basement: false,
//   //         searchField: "",
//   //         price: "",
//   //         // pictures: [],
//   //         images: []
//   //       });
//   //       this.files = [];
//   //       this.props.history.push(`/homes/${response.data.newHome._id}`)
//   //     })
//   //   })
//   // }

//   render() {
//     return (
//       <Mutation
//         mutation={UPDATE_HOME}
//         // if we error out we can set the message here
//         onError={err => this.setState({ message: err.message })}
//         // we need to make sure we update our cache once our home is updated
//         update={(cache, data) => this.updateCache(cache, data)}
//         // when our query is complete we'll display a success message
//         onCompleted={data => {
//           const { name } = data.updateHome;
//           this.setState({
//             message: `Home ${name} updated successfully`
//           });
//         }}
//       >
//         {(updateHome, { data }) => (
//           <div className="create-form-container">
//             <h1 className="create-form-header">
//               Enter the details to update your listing:
//             </h1>
//             <form
//               className="create-form"
//               onSubmit={e => this.handleEdit(e, updateHome)}
//             >
//               <div className="create-form-left">
//                 <input
//                   className="create-input"
//                   onChange={this.update("name")}
//                   value={this.state.name}
//                   placeholder="Name"
//                 />
//                 <input
//                   className="create-input"
//                   onChange={this.update("streetAddress")}
//                   value={this.state.streetAddress}
//                   placeholder="Street Address"
//                 />
//                 <input
//                   className="create-input"
//                   onChange={this.update("city")}
//                   value={this.state.city}
//                   placeholder="City"
//                 />
//                 <select
//                   className="create-input"
//                   // className="state-select-dropdown"
//                   value={this.state.state}
//                   onChange={this.update("state")}
//                 >
//                   <option defaultValue>State</option>
//                   <option value="AK">AK - Alaska</option>
//                   <option value="AL">AL - Alabama</option>
//                   <option value="AR">AR - Arkansas</option>
//                   <option value="AS">AS - American Somoa</option>
//                   <option value="AZ">AZ - Arizona</option>
//                   <option value="CA">CA - California</option>
//                   <option value="CO">CO - Colorado</option>
//                   <option value="CT">CT - Connecticut</option>
//                   <option value="DC">DC - District of Columbia</option>
//                   <option value="DE">DE - Delaware</option>
//                   <option value="FL">FL - Florida</option>
//                   <option value="GA">GA - Georgia</option>
//                   <option value="GU">GU - Guam</option>
//                   <option value="HI">HI - Hawaii</option>
//                   <option value="IA">IA - Iowa</option>
//                   <option value="ID">ID - Idaho</option>
//                   <option value="IL">IL - Illinois</option>
//                   <option value="IN">IN - Indiana</option>
//                   <option value="KS">KS - Kansas</option>
//                   <option value="KY">KY - Kentucky</option>
//                   <option value="LA">LA - Louisiana</option>
//                   <option value="MA">MA - Massachusetts</option>
//                   <option value="MD">MD - Maryland</option>
//                   <option value="ME">ME - Maine</option>
//                   <option value="MI">MI - Michigan</option>
//                   <option value="MN">MN - Minnesota</option>
//                   <option value="MO">MO - Missouri</option>
//                   <option value="MS">MS - Mississippi</option>
//                   <option value="MT">MT - Montana</option>
//                   <option value="NC">NC - North Carolina</option>
//                   <option value="ND">ND - North Dakota</option>
//                   <option value="NE">NE - Nebraska</option>
//                   <option value="NH">NH - New Hampshire</option>
//                   <option value="NJ">NJ - New Jerey</option>
//                   <option value="NM">NM - New Mexico</option>
//                   <option value="NV">NV - Nevada</option>
//                   <option value="NY">NY - New York</option>
//                   <option value="OH">OH - Ohio</option>
//                   <option value="OK">OK - Oklahoma</option>
//                   <option value="OR">OR - Oregon</option>
//                   <option value="PA">PA - Pennsylvania</option>
//                   <option value="PR">PR - Puerto Rico</option>
//                   <option value="RI">RI - Rhode Island</option>
//                   <option value="SC">SC - South Carolina</option>
//                   <option value="SD">SD - South Dakota</option>
//                   <option value="TN">TN - Tennessee</option>
//                   <option value="TX">TX - Texas</option>
//                   <option value="UT">UT - Utah</option>
//                   <option value="VA">VA - Virginia</option>
//                   <option value="VI">VI - Virgin Islands</option>
//                   <option value="VT">VT - Vermont</option>
//                   <option value="WA">WA - Washington</option>
//                   <option value="WI">WI - Wisconsin</option>
//                   <option value="WV">WV - West Virginia</option>
//                   <option value="WY">WY - Wyoming</option>
//                 </select>
//                 <input
//                   className="create-input"
//                   onChange={this.update("zipcode")}
//                   value={this.state.zipcode}
//                   placeholder="Zipcode"
//                 />
//                 <input
//                   className="create-input"
//                   onChange={this.update("yearBuilt")}
//                   value={this.state.yearBuilt}
//                   placeholder="Year built"
//                 />
//                 <input
//                   className="create-input"
//                   onChange={this.update("sqft")}
//                   value={this.state.sqft}
//                   placeholder="Square footage"
//                 />
//                 <input className="create-input"
//                   type="number"
//                   onChange={this.update("price")}
//                   value={this.state.price}
//                   placeholder="Starting price"
//                 />
//               </div>
//               <div className="create-form-right">
//                 <textarea
//                   className="create-input"
//                   onChange={this.update("description")}
//                   value={this.state.description}
//                   placeholder="Description"
//                 />

//                 <input
//                   className="create-input"
//                   onChange={this.update("bathrooms")}
//                   value={this.state.bathrooms}
//                   placeholder="Number of bathrooms"
//                 />
//                 <input
//                   className="create-input"
//                   onChange={this.update("stories")}
//                   value={this.state.stories}
//                   placeholder="Number of stories"
//                 />
//                 <input
//                   className="create-input"
//                   onChange={this.update("bedrooms")}
//                   value={this.state.bedrooms}
//                   placeholder="Number of bedrooms"
//                 />
//                 <div className="create-checkbox">
//                   <input
//                     type="checkbox"
//                     value="garage"
//                     onChange={() =>
//                       this.setState(prevState => ({
//                         garage: !prevState.garage
//                       }))
//                     }
//                   />
//                   <label>Garage</label>
//                 </div>
//                 <div className="create-checkbox">
//                   <input
//                     type="checkbox"
//                     value="basement"
//                     onChange={() =>
//                       this.setState(prevState => ({
//                         basement: !prevState.basement
//                       }))
//                     }
//                   />
//                   <label>Basement</label>
//                 </div>
//                 <div>
//                   Add images:  &nbsp;
//                   <input type="file" multiple onChange={this.handleOnDrop} />
//                 </div>
//                 <button className="create-submit" type="submit">
//                   Update Home
//                 </button>
//               </div>
//             </form>
//             <p>{this.state.message}</p>
//           </div>
//         )}
//       </Mutation>
//     );
//   }
// }

// export default withRouter(UpdateHome);

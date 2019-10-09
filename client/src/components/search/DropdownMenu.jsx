import React from 'react';
import Queries from '../../graphql/queries';
import { Query } from 'react-apollo';
const { ADVANCED_SEARCH } = Queries;

class DropdownMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nameQuery: "",
            categoryQuery: "",
            descriptionQuery: "",
            streetAddressQuery: "",
            cityQuery: "",
            stateQuery: "",
            yearBuiltQuery: "",
            sqftQuery: "",
            zipcodeQuery: "",
            storiesQuery: "",
            bedroomsQuery: "",
            bathroomsQuery: "",
            garageQuery: "",
            basementQuery: ""
        }
    }

    update(field){
        return (e) => {
            this.setState({ [field]: e.target.value })
        }
    }

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        return ( <div id="top-dropdown-menu" className="dropdown-container hidden"></div>
        // <Query query={ADVANCED_SEARCH} variables={{
        //     nameQuery: this.state.nameQuery,
        //     categoryQuery: this.state.categoryQuery,
        //     descriptionQuery: this.state.descriptionQuery,
        //     streetAddressQuery: this.state.streetAddressQuery,
        //     cityQuery: this.state.cityQuery,
        //     stateQuery: this.state.stateQuery,
        //     yearBuiltQuery: this.state.yearBuiltQuery,
        //     sqftQuery: this.state.sqftQuery,
        //     zipcodeQuery: this.state.zipcodeQuery,
        //     storiesQuery: this.state.storiesQuery,
        //     bedroomsQuery: this.state.bedroomsQuery,
        //     bathroomsQuery: this.state.bathroomsQuery,
        //     garageQuery: this.state.garageQuery,
        //     basementQuery: this.state.basementQuery
        // }}>
        //     {({ loading, error, data }) => {
        //         if (loading) return "Loading...";
        //         if (error) return `Error! ${error.message}`;

        //         return (
        //             <div id="top-dropdown-menu" className="dropdown-container hidden">
        //                 <form>
        //                     <div>
        //                         <input onChange={this.update("nameQuery")} type="text" value={this.state.nameQuery} placeholder="Search listing title"/>
        //                         <input onChange={this.update("categoryQuery")} type="text" value={this.state.categoryQuery} placeholder="Search Category"/>
        //                         <input onChange={this.update("descriptionQuery")} type="text" value={this.state.descriptionQuery} placeholder="Search Descriptions"/>
        //                         <input onChange={this.update("yearBuiltQuery")} type="text" value={this.state.yearBuiltQuery} placeholder="Search Year Built"/>
        //                     </div>
        //                     <div>
        //                         <label htmlFor="garage-box"></label>
        //                         <input id="garage-box" onChange={this.update("garageQuery")} type="checkbox" value="garage"></input>
        //                         <label htmlFor="basement-box"></label>
        //                         <input id="basement-box" onChange={this.update("basementQuery")} type="checkbox" value="basement"></input>
        //                         <input onChange={this.update("bedroomsQuery")} type="text" value={this.state.bedroomsQuery} placeholder="Search bedrooms"/>
        //                         <input onChange={this.update("bathroomsQuery")} type="text" value={this.state.bathroomsQuery} placeholder="Search bathrooms"/>
        //                     </div>
        //                     <div>
        //                         <input onChange={this.update("sqftQuery")} type="text" value={this.state.sqftQuery} placeholder="Search by Square Footage"/>
        //                         <input onChange={this.update("storiesQuery")} type="text" value={this.state.storiesQuery} placeholder="Search by stories"/>
        //                         <input type="submit" value="Search"/>
        //                     </div>
        //                 </form>
        //             </div>
        //         )

        //     }}
        // </Query> 
        )
    }
}

export default DropdownMenu;
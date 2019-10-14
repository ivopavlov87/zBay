import React from 'react';
// import Queries from '../../graphql/queries';
// import { Query } from 'react-apollo';
// const { ADVANCED_SEARCH } = Queries;

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
        return (
            <div id="top-dropdown-menu" className="dropdown-container hidden"></div>
        )
    }
}

export default DropdownMenu;
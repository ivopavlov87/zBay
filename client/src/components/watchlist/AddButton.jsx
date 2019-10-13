import React from 'react'
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries';
import Mutations from '../../graphql/mutations';
import { Mutation, Query } from 'react-apollo';
const { FETCH_USER } = Queries;
const { ADD_HOME } = Mutations;

class AddButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: "Add to Watchlist"
        }
    }

    handleSubmit(e, func){
        e.preventDefault();
        func({
            variables: {
                userId: this.props.id,
                homeId: this.props.homeId
            }
        })
    }

    render(){
        return (
            <Query query={FETCH_USER} variables={{ id: this.props.id }}>
                {({ loading, data, error }) => {
                    if (loading) return <div className="loading">Loading...</div>
                    if (error) return `Error! ${error.message}`;
                    let alreadyAdded;
    
                    data.user.watchlist.forEach(home => {
                        if (home._id === this.props.homeId){
                            alreadyAdded = true;
                            return
                        }
                    })
                    if (alreadyAdded){
                        return <Link className="added-success-link" to="/watchlist">Added to Watchlist!</Link>
                    } else {
                        return (
                            <Mutation
                                mutation={ADD_HOME}
                                onError={err => this.setState({ message: err.message })}
                                refetchQueries={() => {
                                    return [
                                        {
                                            query: FETCH_USER,
                                            variables: { id: this.props.id }
                                        }
                                    ];
                                }}
                                // update={(cache, data) => this.updateCache(cache, data)}

                                onCompleted={data => {

                                    this.setState({
                                        message: 'Home added successfully'
                                    });
                                }}
                            >
                                {(addHomeToWatchlist, { data }) => (
                                    <button className="bid-submit" onClick={(e) => this.handleSubmit(e, addHomeToWatchlist)}>
                                        {this.state.message}
                                    </button>
                                )}
                            </Mutation>
                        )
                    }
                }}
            
            </Query>
        )
    }
}

export default AddButton;
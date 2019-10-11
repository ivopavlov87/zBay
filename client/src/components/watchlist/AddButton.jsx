import React from 'react'
import Queries from '../../graphql/queries';
import Mutations from '../../graphql/mutations';
import { Mutation } from 'react-apollo';
const { FETCH_USER } = Queries;
const { ADD_HOME } = Mutations;

class AddButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: ""
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
                        Add to Watchlist
                    </button>
                )}
            </Mutation>
        )
    }
}

export default AddButton;
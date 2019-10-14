import React from 'react';
import Queries from '../../graphql/queries'
import Mutations from "../../graphql/mutations";
import { Mutation } from 'react-apollo';
const { FETCH_USER } = Queries;
const { REMOVE_HOME } = Mutations;

class RemoveButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: ""
        }
    }

    updateCache(cache, { data }) {
        let user;
        try {
            user = cache.readQuery({ query: FETCH_USER, variables: { id: this.props.id }});
        } catch (err) {
            return;
        }

        if (user) {
            // let watchlist = user.watchlist;
            cache.writeQuery({
                query: FETCH_USER,
                data: { user }
            })
        }
    }

    render(){
        return (
            <Mutation
                mutation={REMOVE_HOME}
                update={(cache, data) => this.updateCache(cache, data)}
                onError={err => this.setState({ message: err.message })}
                refetchQueries={() => {
                    return [
                        {
                            query: FETCH_USER,
                            variables: { id: this.props.id }
                        }
                    ];
                }}
                onCompleted={() => this.setState({ message: "Item removed successfully"})}
            >
                {(removeHomeFromWatchlist, { data }) => (
                    <button
                        className="remove-wl-button"
                        onClick={() => {
                            removeHomeFromWatchlist({
                                variables: { userId: this.props.id, homeId: this.props.homeId }
                            })
                        }}>&times;
                    </button>
                )}
            </Mutation>
        )
    }
}

export default RemoveButton;
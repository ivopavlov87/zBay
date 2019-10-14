import React from 'react';
// import { Query } from 'react-apollo';
// import Queries from '../../graphql/queries';
// const { FETCH_HOME } = Queries;

class BidShow extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        let maxBid = 0;
        let maxBidder = "";
        this.props.bids.forEach(bid => {
            if (!bid.user){
                return
            }
            if (bid.amount > maxBid && bid.user){
                maxBid = bid.amount
                maxBidder = bid.user.username
            }
        });
        if (maxBid === 0){
            return (
                <div className="show-high-bid">
                    <h2 className="current-high-bidder-header">Be the first to Bid</h2>
                    <div className="show-high-bid-info">
                    </div>
                </div>
            )
        } else {
            return (
                <div className="show-high-bid">
                    <h2 className="current-high-bidder-header">Current High-Bidder:</h2>
                    <div className="show-high-bid-info">
                        <h3 className="current-high-bidder">{maxBidder}</h3>
                        <h3 className="high-bid">${maxBid}</h3>
                    </div> 
                </div>
            )
        }
    }
}

export default BidShow;
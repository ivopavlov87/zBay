import React from 'react';
import { Link } from 'react-router-dom';
import Queries from '../../graphql/queries'
import { Query } from 'react-apollo';
import { useApolloClient } from 'react-apollo-hooks'
import RemoveButton from './RemoveButton';
import Slider from 'react-slick';
import { Image } from 'cloudinary-react';
import Loading from "../loading/loading"
const { FETCH_USER, FETCH_USER_ID } = Queries;
const token2 = process.env.REACT_APP_TOKEN2



const Watchlist = () => {
    const client = useApolloClient();
    const idPreSearch = client.readQuery({ query: FETCH_USER_ID })
    const idPostSearch = idPreSearch._id
    if (idPostSearch === null) {
        return null
    }

    return (
        <Query query={FETCH_USER} variables={{ id: idPostSearch }}>
            {({ loading, error, data }) => {
                if (loading) return <Loading/>;
                if (error) return `Error! ${error.message}`
                
                const imageSettings = {
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    className: "watchlist-slider",
                    adaptiveHeight: true,
                }

                if (data.user.watchlist.length === 0){
                    return (
                        <div className="watchlist-container">
                            <h1 className="watchlist-header">You havent added any listings yet...</h1>
                            <h3 className="watchlist-subheader">Click 'Add to Watchlist' on a listing to save it here!</h3>
                        </div>
                    )
                } else {
                    let watchlistItems = data.user.watchlist.map(home => {
                        let images;
                        if (home.images && home.images.length > 0) {
                            images = home.images.map((image, i) => {
                                return <div key={i}><Image className='index-image-slide' cloudName={token2} publicId={image} /></div>
                            })
                        } else {
                            images = <div>`there are no images for {home.name}`</div>
                        }
                        return (
                            <li key={home._id} className="watchlist-li">
                                <Link to={`/homes/${home._id}`}>
                                    <h3>{home.name}</h3>
                                    <h3>{home.streetAddress},&nbsp;{home.city},&nbsp;{home.state}</h3>
                                </Link>
                                <RemoveButton id={idPostSearch} homeId={home._id} />
                                <span className="wl-hover-image">
                                    <div className="hover-image-content">
                                        <Slider {...imageSettings}>{images[0]}</Slider>
                                    </div>
                                </span>
                            </li>
                        )
                    })
                    return (
                        <div className="watchlist-container">
                            <h1 className="watchlist-header">Your Watched Listings</h1>
                            <ul className="watchlist-ul">
                                <li style={{"textDecoration": "underline"}} className="watchlist-li-headers">
                                    <h3>Title</h3>
                                    <h3>Address</h3>
                                </li>
                                {watchlistItems}
                            </ul>
                        </div>
                    )
                }
            }}
        </Query>
    )

}

export default Watchlist;
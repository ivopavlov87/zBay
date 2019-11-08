import React from 'react'
import HomeIndexContainer from './HomeIndex';
import { Query } from "react-apollo";
import Map from "../map/map_view";
import Queries from "../../graphql/queries";
import Loading from "../loading/loading"
const { FETCH_HOMES } = Queries;


class MainPage extends React.Component {

    render() {
        return (
            <div className="home-index">
                <Query query={FETCH_HOMES}>
                    {({ loading, error, data }) => {
                        if (loading) return <Loading />;
                        if (error) return `Error! ${error.message}`;
                        return (
                            <Map homes={data.homes} />
                        )
                    }}
                </Query>
                <HomeIndexContainer />
            </div>
        )
    }
}

export default MainPage;
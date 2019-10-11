import React from 'react';
import Queries from '../../graphql/queries';
import { useApolloClient } from '@apollo/react-hooks'
import AddButton from './AddButton';
const { FETCH_USER_ID } = Queries;


const AddButtonContainer = (props) => {
    const client = useApolloClient();
    const idPreSearch = client.readQuery({ query: FETCH_USER_ID })
    const idPostSearch = idPreSearch._id
    if (idPostSearch === null) {
        return null
    }

    return (
        <AddButton id={idPostSearch} homeId={props.homeId} />
    )
}

export default AddButtonContainer;
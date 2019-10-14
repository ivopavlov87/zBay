import React from "react";
import { Mutation } from "react-apollo";
import Mutations from "../../graphql/mutations";
import Queries from "../../graphql/queries";
import { useApolloClient } from "react-apollo-hooks";

const { FETCH_USER_HOMES, FETCH_USER_ID } = Queries;
const { DELETE_HOME } = Mutations;


const DeleteHome = props => {

const client = useApolloClient();
  const idPreSearch = client.readQuery({ query: FETCH_USER_ID });
  const idPostSearch = idPreSearch._id;
  if (idPostSearch === null) {
    return null;
}


    // const linkStyle = {
      // cursor: "pointer",
    //   fontSize: "10px",
    //   color: "red"
    // };
    
  return (
    <Mutation
      mutation={DELETE_HOME}
      refetchQueries={() => {
        return [
          {
            query: FETCH_USER_HOMES,
            variables: {id: idPostSearch}
          }
        ];
      }}
    >
      {(deleteHome, { data }) => (
        <button
          className="delete-hm-btn"
          // style={linkStyle}
          onClick={e => {
            e.preventDefault();
            deleteHome({ variables: { id: props.id } });
          }}
        >
          <p>Delete</p>
        </button>
      )}
    </Mutation>
  );
};

export default DeleteHome;
// import React from "react";
// import { Mutation } from "react-apollo";
// import Mutations from "../../graphql/mutations";
// import Queries from "../../graphql/queries";
// const { FETCH_HOME } = Queries;
// const { DELETE_HOME } = Mutations;

// const linkStyle = {
//   cursor: "pointer",
// //   fontSize: "10px",
// //   color: "red"
// };

// const DeleteHome = props => {
    
//   return (
//     <Mutation
//       mutation={DELETE_HOME}
//       refetchQueries={() => {
//         return [
//           {
//             query: FETCH_HOME
//           }
//         ];
//       }}
//     >
//       {(deleteHome, { data }) => (
//         <a
//           style={linkStyle}
//           onClick={e => {
//             e.preventDefault();
//             deleteHome({ variables: { id: props.id } });
//           }}
//         >
//           <p>Delete</p>
//         </a>
//       )}
//     </Mutation>
//   );
// };

// export default DeleteHome;
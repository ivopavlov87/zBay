// import React from 'react';
// import MapGL, { StaticMap } from 'react-map-gl';
// import Geocoder from "react-map-gl-geocoder";
// import { useQuery, useApolloClient } from 'react-apollo-hooks'
// import gql from "graphql-tag";
// import DeckGL, { GeoJsonLayer} from "deck.gl";
// import Map from "./map_view"

// const MAP_VIEWPORT = gql`
//   {
//     viewport @client
//   }
// `
// const {data}  = useQuery(MAP_VIEWPORT)
// const client = useApolloClient()

// const changeState = value =>
//   client.writeData({
//     data: { viewport: value }
// })

// const token = process.env.REACT_APP_TOKEN

// class MapSearchBar extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       viewport: {
//         width: 1,
//         height: 1,
//         longitude: -122.466233,
//         latitude: 37.684638,
//         zoom: 7,
//       },
//       searchResultLayer: null,
//     }

//   }

//   mapRef = React.createRef()
//   geocoderContainerRef = React.createRef();


//   handleViewportChange = viewport => {
//     this.setState({
//       viewport: { ...this.state.viewport, ...viewport }
//     })
//   };

//   handleGeocoderViewportChange = viewport => {
//     const geocoderDefaultOverrides = { transitionDuration: 1000 };
//     return this.handleViewportChange({
//       ...viewport,
//       ...geocoderDefaultOverrides
//     });
//   };

//   handleOnResult = event => {
//     debugger
//     this.setState({
//       searchResultLayer: new GeoJsonLayer({
//         id: "search-result",
//         data: event.result.geometry,
//         getFillColor: [255, 0, 0, 128],
//         getRadius: 1000,
//         pointRadiusMinPixels: 10,
//         pointRadiusMaxPixels: 10
//        })
//     })
//   }

//   render(){
//     const {viewport, searchResultLayer} = this.state
//     return(
//       <div className="search-bar">
//           <div  
//             ref={this.geocoderContainerRef}
//             className="landing-page-map-search"
//           />
//         <MapGL className="the-display-none-map"
//           ref={this.mapRef}
//           {...viewport}
//           onViewportChange={this.handleViewportChange}
//           mapboxApiAccessToken={token}
//           >
//           <Geocoder 
//             mapRef={this.mapRef}
//             containerRef={this.geocoderContainerRef}
//             onResult={this.handleOnResult}
//             onViewportChange={this.handleGeocoderViewportChange}
//             mapboxApiAccessToken={token}
//           />
//         </MapGL>
//       </div>
//     )
//   }

// }

// export default MapSearchBar

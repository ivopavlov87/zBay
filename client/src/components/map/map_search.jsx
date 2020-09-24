import React from 'react';
import MapGL from 'react-map-gl';
import { withRouter } from 'react-router-dom';
import Geocoder from "react-map-gl-geocoder";
import { GeoJsonLayer } from "deck.gl";
// import DeckGL, { GeoJsonLayer} from "deck.gl";
import {writeApolloHook} from './with_apollo_hook'


const token = process.env.REACT_APP_TOKEN

class MapSearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        width: 1,
        height: 1,
        longitude: -122.466233,
        latitude: 37.684638,
        zoom: 7,
      },
      searchResultLayer: null,
    }
  }

  mapRef = React.createRef()
  geocoderContainerRef = React.createRef();

   handleOnResult = event => {
     // this function is for the geocoder result
    let cacheViewport = event.result;
    if(this){
      this.setState({
        viewport: event.result,
        searchResultLayer: new GeoJsonLayer({
          id: "search-result",
          data: event.result.geometry,
          getFillColor: [255, 0, 0, 128],
          getRadius: 1000,
          pointRadiusMinPixels: 10,
          pointRadiusMaxPixels: 10})
      })
      cacheViewport = this.state.viewport
    }
    this.finished(cacheViewport)
  }

  finished(viewport){
    // setCache is using the appolo hooks through the HOC 
    // We are adding Viewport to state because the map will referance it for the map info/location
    this.props.setCache(viewport)
    // We are now redirecting to the route with the map which will use the viewport on state assigned above
    this.props.history.push("/home")
  }

  render(){
    const {viewport} = this.state
    return(
      <div className="map-search-page">
        <div className="map-search-inner">
          <div className="map-search-header">
            <h1 className="map-search-title">Reimagine home</h1>
            <h4 className="map-search-title subtext">We’ll help you find a place you’ll love.</h4>
            <div className="landing-page-map-search"
              ref={this.geocoderContainerRef}
            />
          </div>
          {/* this is a dummy map that NEEDS to exist for the geocoder to behave */}
          <MapGL className="the-display-none-map"
            ref={this.mapRef}
            {...viewport}
            mapboxApiAccessToken={token}
            visible={false}
            attributionControl={false}
            >
            {/* The Geocoder is a serach bar that will translate the users input into its best guess of a location */}
            <Geocoder 
              options={{ flyTo: false }}
              mapRef={this.mapRef}
              containerRef={this.geocoderContainerRef}
              onResult={this.handleOnResult}
              mapboxApiAccessToken={token}
              placeholder={"Enter a city, state, or zipcode"}
              // clearAndBlurOnEsc={true}
              // inputValue={"96792"}
              // onInit={this.geocoderDidMount}
            />
          </MapGL>
        </div>
      </div>
    )
  }

}

export default withRouter(writeApolloHook(MapSearchBar))



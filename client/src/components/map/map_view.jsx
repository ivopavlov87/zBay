import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
// var MapboxClient = require('mapbox');
// var client = new MapboxClient('sk.eyJ1Ijoiam9uYXRoYW5qb2huc29uIiwiYSI6ImNrMWJucnFuYzBrYjczaW9iZjF1c2Jxcm4ifQ.J_C-UOflCxxlqp0HuWI9mg');
const TOKEN = 'pk.eyJ1Ijoiam9uYXRoYW5qb2huc29uIiwiYSI6ImNrMWJtcGQ2eTAwNGMza212dzVwb2UyZmwifQ.CfNGkydDCpLC5hPoddptfA';


 class SearchableMap extends React.Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 5,
    },
    searchResultLayer: null
  };
  componentDidMount(){
    // mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXRoYW5qb2huc29uIiwiYSI6ImNrMWJtcGQ2eTAwNGMza212dzVwb2UyZmwifQ.CfNGkydDCpLC5hPoddptfA';
    // var map = new mapboxgl.Map({
    //   container: 'killME',
    //   style: 'mapbox://styles/mapbox/streets-v11'
    // });
  }
  mapRef = React.createRef()

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  };

  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    })
  }
 
  render() {
    const { viewport, searchResultLayer} = this.state
    return (
      <div style={{ height: '100vh'}}>
        <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Use the search bar to find a location or click <a href="/">here</a> to find your location</h1>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          width="100%"
          height="90%"
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={TOKEN}
          >
          <Geocoder 
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={TOKEN}
            position='top-left'
          />
          <DeckGL {...viewport} layers={[searchResultLayer]} />
        </MapGL>
      </div>
    );
  }
}

export default SearchableMap
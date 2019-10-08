import React, { useState, useEffect, Fragment } from 'react';
import MapGL, { StaticMap } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const token = process.env.REACT_APP_TOKEN

export default () => {
  const [viewport, setViewport] = useState({ width: 1, height: 1, latitude: 37.684638, longitude: -122.466233, zoom: 7 })
  // const [searchResultLayer, setSearchResultLayer] = useState("")
  const client = useApolloClient()


  const mapRef = React.createRef()
  const geocoderContainerRef = React.createRef();


  const handleViewportChange = nextViewport => {
    setViewport({ ...nextViewport, ...viewport })
  };

  const handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  const handleOnResult = event => {
    // setSearchResultLayer(
    //   new GeoJsonLayer({
    //     id: "search-result",
    //     data: event.result.geometry,
    //     getFillColor: [255, 0, 0, 128],
    //     getRadius: 1000,
    //     pointRadiusMinPixels: 10,
    //     pointRadiusMaxPixels: 10
    //    })
    // )
    const coordinates = event.result.geometry.coordinates
    const assign = {latitude: coordinates[1], longitude: coordinates[0]}
    client.writeData({ data: {coordinates: JSON.stringify(assign) } })
  }


  return(
    <div className="search-bar">
        <div  
          ref={geocoderContainerRef}
          className="landing-page-map-search"
        />
      <MapGL className="the-display-none-map"
        ref={mapRef}
        {...viewport}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={token}
        >
        <Geocoder 
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onResult={handleOnResult}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={token}
        />
      </MapGL>
    </div>
  )
}

// on export wrap it in with router and then with apollo hook or vise versa  

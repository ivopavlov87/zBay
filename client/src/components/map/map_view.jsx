import React from 'react';
import MapGL, { StaticMap } from 'react-map-gl';
import DeckGL, { GeoJsonLayer} from "deck.gl";
import {IconLayer} from '@deck.gl/layers';
import Geocoder from "react-map-gl-geocoder";
import reactIcon from "./test2.png"
import zBayIcon from "./test1.ico"
import "./map_view.css"
const token = process.env.REACT_APP_TOKEN

// const ICON_MAPPING = {
//   marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
// };
const homeLocations = [
  {name: 'Colma', passengers: 4214, coordinates: [-122.466233, 37.684638], icon:zBayIcon},
  {name: 'Civic Center', passengers: 24798, coordinates: [-122.413756,37.779528], icon:zBayIcon},
  {name: 'icon1', coordinates: [-112.466233, 37.684638], icon:reactIcon},
  {name: 'icon2', coordinates: [-92.466233, 22.684638], icon:reactIcon},
  {name: 'icon3', coordinates: [-133.466233, 22.684638], icon:reactIcon},
]
 class SearchableMap extends React.Component {
   state = {
     viewport: {
       width: 400,
       height: 400,
       longitude: -123.466233,
       latitude: 32.684638,
       zoom: 5,
      },
      searchResultLayer: null,
    homeIconsLayer: new IconLayer({
      id: 'icon-layer',
      data: homeLocations,
      pickable: true,
      // getIcon: return a string
      // iconAtlas: reactIcon,
      // iconMapping: ICON_MAPPING,
      getIcon: d => ({
        url: d.icon,
        width: 428,
        height: 428
      }),
      // getIcon: d => d.icon,
      // sizeScale: 15,
      getSize: d => 100,
      getPosition: d => d.coordinates,
      getColor: [0, 140, 0],
      // onHover: ({object, x, y}) => {
      //   const tooltip = `${object.name}\n${object.address}`;
      //   /* Update tooltip
      //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      //   */
      // }
    })
  };

  // query for the houses and store them somewhere or keep them on cache 
  //then for every home they will 
  // have an id pass that id to layer which will have the markers stored and each marker will kinda be
  // its own object or at least have some data referncing it so we can pull that data and use it where
  // needed to show house 
   
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
    const { viewport, searchResultLayer, homeIconsLayer} = this.state
    return (
      <div className="map-container">
        {/* the map itself this is the base layer and all of DeckGl's layers go ontop of this canvas */}
        <MapGL
          reuseMaps
          ref={this.mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          width="100%"
          height="100%"
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={token}
        >
          {/* DeckGl handles layers that go on and over map */}
          <DeckGL 
            viewState={viewport}
            layers={[searchResultLayer, homeIconsLayer]}
          >
          {/* the serching mechanic */}
          <Geocoder 
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={token}
            position='top-left'
          />
          </DeckGL>
        </MapGL>
      </div>
    );
  }
}

export default SearchableMap
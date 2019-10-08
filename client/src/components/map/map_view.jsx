import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer} from "deck.gl";
import {IconLayer} from '@deck.gl/layers';
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import {withApolloHook} from './with_apollo_hook'
import zBayIcon from "./test1.ico"
import reactIcon from "./test1.ico"

import "./map_view.css"

const token = process.env.REACT_APP_TOKEN

// const ICON_MAPPING = {
//   marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
// };

const homeLocations = [
  {name: 'Colma', passengers: 4214, coordinates: [-122.466233, 37.684638], icon:zBayIcon, description:"these are hardcodded placeholders", state:"PH"},
  {name: 'Civic Center', passengers: 24798, coordinates: [-122.413756,37.779528], icon:zBayIcon, description:"these are hardcodded placeholders", state:"PH"},
  {name: 'icon1', coordinates: [-112.466233, 37.684638], icon:reactIcon, description:"these are hardcodded placeholders", state:"PH"},
  {name: 'icon2', coordinates: [-92.466233, 22.684638], icon:reactIcon, description:"these are hardcodded placeholders", state:"PH"},
  {name: 'icon3', coordinates: [-133.466233, 22.684638], icon:reactIcon, description:"these are hardcodded placeholders", state:"PH"},
  ]

 class TheMap extends React.Component {
   constructor(props){
     super(props)
      this.state = {
        viewport: {
          width: 400,
          height: 400,
          longitude: this.props.long,
          latitude: this.props.lat,
          zoom: 7,
          },
          searchResultLayer: null,
          homeIconsLayer: new IconLayer({
            id: 'icon-layer',
            data: homeLocations,//.concat(this.props.homes),
            pickable: true,
            // getIcon: return a string
            // iconAtlas: reactIcon,
            // iconMapping: ICON_MAPPING,
            getIcon: d => ({
              url: d.icon ? d.icon : zBayIcon,
              width: 428,
              height: 428
            }),
            // getIcon: d => d.icon,
            // sizeScale: 15,
            getSize: d => 100,
            getPosition: d => d.coordinates,
            getColor: [0, 140, 0],
            onHover: ({object}, event) => {
              // const tooltip = { description: object.description, state: object.state };
              // console.log(`this is the object`, object)
              // console.log(`this is the event `,event)
              //   /* Update tooltip
              //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
              //   */
            },
            onClick: (home, event) => {
              console.log(home)
              console.log(event)
            }
        }),
        mounted: false
      }
  };

  // query for the houses and store them somewhere or keep them on cache 
  //then for every home they will 
  // have an id pass that id to layer which will have the markers stored and each marker will kinda be
  // its own object or at least have some data referncing it so we can pull that data and use it where
  // needed to show house 
  
  mapRef = React.createRef()

  componentDidMount () {
    this.setState({ mounted: true })
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  };
 
  render() {
    const { viewport, homeIconsLayer, mounted} = this.state
    return (
      <div className="map-container">
        <MapGL
          reuseMaps
          ref={this.mapRef}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          width="100%"
          height="100%"
          onViewportChange={(viewport) => {
            if (mounted) { this.setState({ viewport }) }
          }}
          mapboxApiAccessToken={token}
          attributionControl={false}
        >
          <DeckGL 
            viewState={viewport}
            layers={[homeIconsLayer]}
          >
          </DeckGL>
        </MapGL>
      </div>
    );
  }
}

export default withApolloHook(TheMap)
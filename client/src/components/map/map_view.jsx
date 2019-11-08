import React from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
import DeckGL from "deck.gl";
// import DeckGL, { GeoJsonLayer} from "deck.gl";
import {IconLayer} from '@deck.gl/layers';
// import { useQuery, useApolloClient } from 'react-apollo-hooks';
import {withApolloHook} from './with_apollo_hook';
import { withRouter } from 'react-router-dom';
import mapMarker from "./test1.png"
// import reactIcon from "./test1.ico"

import "./map_view.css"

const token = process.env.REACT_APP_TOKEN

// const ICON_MAPPING = {
//   marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
// };

// const homeLocations = [
//   {name: 'Colma', passengers: 4214, coordinates: [-122.466233, 37.684638], icon:mapMarker, description:"these are hardcodded placeholders", state:"PH"},
//   {name: 'Civic Center', passengers: 24798, coordinates: [-122.413756,37.779528], icon:mapMarker, description:"these are hardcodded placeholders", state:"PH"},
//   {name: 'icon1', coordinates: [-112.466233, 37.684638], icon:reactIcon, description:"these are hardcodded placeholders", state:"PH"},
//   {name: 'icon2', coordinates: [-92.466233, 22.684638], icon:reactIcon, description:"these are hardcodded placeholders", state:"PH"},
//   {name: 'icon3', coordinates: [-133.466233, 22.684638], icon:reactIcon, description:"these are hardcodded placeholders", state:"PH"},
//   ]

 class TheMap extends React.Component {
   constructor(props){
     super(props);
      this.state = {
        viewport: {
          width: 400,
          height: 400,
          longitude: this.props.long,
          latitude: this.props.lat,
          zoom: 10,
          },
          mounted: false,
          searchResultLayer: null,
          homeIconsLayer: new IconLayer({
            id: 'icon-layer',
            data: this.props.homes,
            pickable: true,
            // getIcon: return a string
            // iconAtlas: reactIcon,
            // iconMapping: ICON_MAPPING,
            getIcon: d => ({
              url: mapMarker,
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
              // return <div>{object.images[0]}</div>
            },
            onClick: ({object}, event) => {
              this.props.history.push(`/homes/${object._id}`)
              console.log(object)
              console.log(event)
            }
        })
      }
  };

  // query for the houses and store them somewhere or keep them on cache 
  //then for every home they will 
  // have an id pass that id to layer which will have the markers stored and each marker will kinda be
  // its own object or at least have some data referencing it so we can pull that data and use it where
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
            viewState={{...viewport, controller: true }}
            layers={[homeIconsLayer]}
          >
          </DeckGL>
          <div className="map-nav-control" style={{position: 'absolute', right: 10, top: 10}}>
            <NavigationControl />
          </div>
        </MapGL>
      </div>
    );
  }
}

export default withRouter(withApolloHook(TheMap))
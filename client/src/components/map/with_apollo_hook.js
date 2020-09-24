import React from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import  gql  from 'graphql-tag'

const MAP = gql`
{
  viewport @client
}
`
//this is used for the map itself to read from state with hooks 
export function withApolloHook(Component) {
  return function WrappedComponent(props) {
    const client = useApolloClient()
    let postViewportSearchPreParse;
    try {
      postViewportSearchPreParse = client.readQuery({ query: MAP })
      const viewportPostSearch = JSON.parse(postViewportSearchPreParse.viewport)
      return <Component {...props} lat={viewportPostSearch.geometry.coordinates[1]} long={viewportPostSearch.geometry.coordinates[0]} />
    } catch (error) {
      props.history.push('/')
      return <Component {...props} />
    }
  }
}
//this is used to write to state for the map with apollo hooks
export function writeApolloHook(Component) {
  return function WrappedViewport(props){
    const client = useApolloClient()
    function setCache(viewport) {
      client.writeData({ data: {viewport: JSON.stringify(viewport) } })
    } 
    return <Component {...props} setCache={setCache}/>
  }
}


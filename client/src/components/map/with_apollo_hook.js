import React from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import  gql  from 'graphql-tag'

const MAP = gql`
{
  viewport @client
}
`

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

export function writeApolloHook(Component) {
  return function WrappedViewport(props){
    const client = useApolloClient()
    function setCache(viewport) {
      client.writeData({ data: {viewport: JSON.stringify(viewport) } })
    } 
    return <Component {...props} setCache={setCache}/>
  }
}


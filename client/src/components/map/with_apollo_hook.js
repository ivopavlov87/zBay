import React from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import  gql  from 'graphql-tag'

const MAP = gql`
{
  coordinates @client
}
`

function withApolloHook(Component) {
  return function WrappedComponent(props) {
    const client = useApolloClient()
    const coordinatesPreParse = client.readQuery({ query: MAP })
    const coordinates = JSON.parse(coordinatesPreParse.coordinates)
    debugger
    return <Component {...props} lat={coordinates.latitude} long={coordinates.longitude} />
  }
}

export default withApolloHook
import React, { Component } from 'react'

import Rating from './../components/Rating'

export default class Photoshoot extends Component {

  render() {
    // return (
    //   <div>
    //     <div>{this.props.link.description} ({this.props.link.url})</div>
    //   </div>
    // )


    const linksToRender = [{
      id: '1',
      description: 'The Coolest GraphQL Backend 😎',
      url: 'https://www.graph.cool'
    }, {
      id: '2',
      description: 'The Best GraphQL Client',
      url: 'http://dev.apollodata.com/'
    }]

    return (
      <div>
        {linksToRender.map(link => (
          <Rating key={link.id} link={link}/>
        ))}
      </div>
    )
  }

}

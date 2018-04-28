import React, { Component } from 'react'
import PhotographerDirectory from './../components/Photographer/PhotographerDirectory'
import ClientAPI from './../api/client_api'


export default class PhotographerDirectoryScreen extends Component {

  state = {
    users: [],
    loading: true
  }

  componentDidMount() {
    const address = this.props.match.params.address;

    ClientAPI.listUsers(address).then((res) => {
      this.setState({ loading: false })

      if (Array.isArray(res.body)) {
        const users = res.body
        const sortedUsers = users.sort((a, b) => { 
          return (new Date(b.created_at)) - (new Date(a.created_at)) 
        })
        this.setState({ users: sortedUsers })
      } else {
        throw new Error("failed to list users")
      }
    }).catch((err) => {
      this.setState({ loading: false })

      alert(err.message)
    })
  } 

  deformatAddress(formattedAddress) {
    return formattedAddress.replace(/--/g,", ").replace(/-/g," ")
  }


  render() {
    const graphData = []

    return <PhotographerDirectory users={this.state.users} loading={this.state.loading} address={this.deformatAddress(this.props.match.params.address)} />
  }

}

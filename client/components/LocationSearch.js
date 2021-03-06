import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export default class LocationSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })

    this.searchOptions = {
      types: ['(cities)']
    }
  }

  handleFormSubmit = (event) => {
    if (event) event.preventDefault()
    this.getGeolocation(this.state.address)
  }

  handleSelect = (address, placeId) => {
    this.setState({ address, placeId })

    this.trackSearch(address)
    this.props.handleSelect(address);

    // this.getGeolocation(address)
  }

  getGeolocation(address) {

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))

    return this.state.address
  }

  trackSearch(address) {
    if (typeof gtag === "undefined") return
      
    gtag('event', 'search', {
      'event_category': 'Photographers',
      'event_label': address
    })
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Enter City'
    }

    const cssClasses = {
      input: 'location_search_input',
      autocompleteContainer: 'location_autocomplete_container'
    }

    return (
      <form onSubmit={this.handleFormSubmit} className="location_search_form">
        <div className=''>
          <PlacesAutocomplete inputProps={inputProps} classNames={cssClasses} onSelect={this.handleSelect} options={this.searchOptions} />
          <button type="submit" className="location_search_btn">Search</button>
        </div>
      </form>
    )
  }
}

import React, { Component } from 'react'
import Map from './Map'

class App extends Component {
  state = {
    markers: [],
    center: undefined,
    myLocation: undefined,
  }
  constructor() {
    super()
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
  }
  componentDidMount() {
    if ('geolocation' in navigator) {
      const handleCurrentPosition = (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        this.setState({
          center: { lat, lng },
          myLocation: { lat, lng },
        })
      }
      const handleError = (err) => console.error(err)
      const options = { enableHighAccuracy: true, }

      navigator.geolocation.getCurrentPosition(handleCurrentPosition, handleError, options)
    }
  }
  handleMapLoad(map) {
    this._map = map
  }
  handleMapClick({ latLng }) {
    const nextMarkers = [
      ...this.state.markers,
      { position: latLng, },
    ]
    this.setState({
      markers: nextMarkers,
    })
  }
  render() {
    const container = <div style={{height: '100%'}} />
    return (
      <Map
        myLocation={this.state.myLocation}
        center={this.state.center}
        markers={this.state.markers}
        containerElement={container}
        mapElement={container}
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
      />
    )
  }
}

export default App

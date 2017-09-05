import React, { Component } from 'react'
import Map from './Map'
import { restaurantsRef } from './lib/firebase'
import Sidebar from './Sidebar'

const MenuIcon = ({ onClick }) => {
  return (
    <div id="menu-toggler">
      <button onClick={onClick} className="btn btn-default">
        <i className="fa fa-bars fa-lg"></i>
      </button>
    </div>
  )
}

class App extends Component {
  state = {
    markers: [],
    center: undefined,
    myLocation: undefined,
    openSidebar: false,
  }
  constructor() {
    super()
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMarkerClose = this.handleMarkerClose.bind(this)
    this.handleCenterChanged = this.handleCenterChanged.bind(this)
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }
  componentDidMount() {
    this.getCurrentPosition()
    this.handleRestaurantData()
  }
  handleToggleSidebar() {
    this.setState(prev => ({
      openSidebar: !prev.openSidebar,
    }))
  }
  handleMarkerClick(targetMarker) {
    const nextMarkers = this.state.markers.map(m => m === targetMarker ? ({
      ...m,
      showInfo: true,
    }) : m)
    this.setState({ markers: nextMarkers })
  }
  handleMarkerClose(targetMarker) {
    const nextMarkers = this.state.markers.map(m => m === targetMarker ? ({
      ...m,
      showInfo: false,
    }) : m)
    this.setState({ markers: nextMarkers })
  }
  handleRestaurantData() {
    restaurantsRef.on('value', (snap) => {
      const restaurants = snap.val()
      const markers = Object.keys(restaurants).map(id => ({
        showInfo: false,
        position: restaurants[id].latLng,
        nama: restaurants[id].nama,
        harga: restaurants[id].harga,
      }))
      this.setState({ markers })
    })
  }
  getCurrentPosition() {
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
    console.log(latLng.lat(), latLng.lng())
  }
  handleCenterChanged() {
    this.setState({
      center: this._map.getCenter(),
    })
  }
  render() {
    const fullHeight = { height: '100%' }
    const mapContainer = <div id="map-container" style={fullHeight} />
    const mapElement = <div id="map-element" style={fullHeight} />

    const { openSidebar } = this.state
    return (
      <div id="app-container" style={fullHeight}>
        <Sidebar onClose={this.handleToggleSidebar} active={openSidebar} />
        <MenuIcon onClick={this.handleToggleSidebar} />
        <Map
          myLocation={this.state.myLocation}
          center={this.state.center}
          markers={this.state.markers}
          containerElement={mapContainer}
          mapElement={mapElement}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          onCenterChanged={this.handleCenterChanged}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
    )
  }
}

export default App

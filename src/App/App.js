import React                from 'react'
import Map                  from '../Map/Map'
import Sidebar              from '../Sidebar/Sidebar'
import { restaurantsRef }   from '../lib/firebase'
import * as Modes           from '../modes'
import Navbar               from './Navbar'
import LocationSelector     from './LocationSelector'

class App extends React.Component {
  state = {
    mode: Modes.EXPLORE,
    markers: [],
    selectedMarker: undefined,
    center: undefined,
    myLocation: undefined,
    selectedLocation: undefined,
    isSidebarActive: false,
  }
  constructor() {
    super()
    this.handleMapLoad        = this.handleMapLoad.bind(this)
    this.handleMapClick       = this.handleMapClick.bind(this)
    this.handleMarkerClick    = this.handleMarkerClick.bind(this)
    this.handleMarkerClose    = this.handleMarkerClose.bind(this)
    this.handleCenterChanged  = this.handleCenterChanged.bind(this)
    this.handleToggleSidebar  = this.handleToggleSidebar.bind(this)
    this.handleChangeMode     = this.handleChangeMode.bind(this)
    this.handleChooseLocation = this.handleChooseLocation.bind(this)
    this.handleResetMode      = this.handleResetMode.bind(this)
    this.handleAddLocation    = this.handleAddLocation.bind(this)
    this.handleUpdateLocation = this.handleUpdateLocation.bind(this)
    this.handleRemoveLocation = this.handleRemoveLocation.bind(this)
  }
  componentDidMount() {
    this.getCurrentPosition()
    this.handleRestaurantData()
  }
  handleAddLocation({ name, img, menus }) {
    // TODO handle async flow
    // const { lat, lng } = this.state.center
    const { lat, lng } = this.state.selectedLocation
    const newRestaurant = restaurantsRef.push()

    newRestaurant.set({
      name,
      img,
      latLng: { lat: lat(), lng: lng() },
    })

    if (menus.length) {
      menus.forEach(m => {
        newRestaurant.child('menus').push().set({
          name: m.name,
          img: m.img,
          price: m.price,
        })
      })
    }

    this.handleResetMode()
  }
  handleUpdateLocation(restaurant) {
    const { id, name, img, latLng } = restaurant
    const menus = restaurant.menus.reduce((b, a) => {
      const { id, name, price, img } = a
      return {
        ...b,
        [id]: { name, price, img },
      }
    }, {})
    restaurantsRef.child(id).set({
      name,
      img,
      latLng,
      menus,
    })

    this.handleResetMode()
  }
  handleRemoveLocation(id) {
    restaurantsRef.child(id).remove().then(() => {
      const markers = this.state.markers.filter(m => m.id !== id)
      this.setState({ markers })
      this.handleResetMode()
    })
  }
  handleChangeMode(mode) {
    this.setState({ mode })
  }
  handleToggleSidebar() {
    this.setState(prev => ({
      isSidebarActive: !prev.isSidebarActive,
    }))
  }
  handleMarkerClick(targetMarker) {
    this.setState({
      mode: Modes.DETAIL,
      selectedMarker: targetMarker,
      selectedLocation: undefined,
      isSidebarActive: true,
    })
    // const nextMarkers = this.state.markers.map(m => m === targetMarker ? ({
    //   ...m,
    //   showInfo: true,
    // }) : m)
    // this.setState({ markers: nextMarkers })
  }
  handleMarkerClose(targetMarker) {
    // const nextMarkers = this.state.markers.map(m => m === targetMarker ? ({
    //   ...m,
    //   showInfo: false,
    // }) : m)
    // this.setState({ markers: nextMarkers })
  }
  handleRestaurantData() {
    restaurantsRef.on('value', (snap) => {
      const restaurants = snap.val()
      const mapMenus = menus => menus ? Object.keys(menus).map(id => ({
        id,
        img: menus[id].img || '',
        name: menus[id].name,
        price: menus[id].price,
      })) : []
      const markers = Object.keys(restaurants).map(id => ({
        id,
        img: restaurants[id].img || '',
        name: restaurants[id].name,
        latLng: restaurants[id].latLng,
        menus: mapMenus(restaurants[id].menus),
      }))
      console.log('new markers', markers)
      this.setState({ markers })
    })
  }
  getCurrentPosition() {
    if ('geolocation' in navigator) {
      const handleCurrentPosition = (position) => {
        const { latitude: lat, longitude: lng } = position.coords
        this._map.panTo({ lat, lng })
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

    const center = this._map.getCenter()
    this.setState({ center })
  }
  handleMapClick({ latLng }) {
    console.log(latLng.lat(), latLng.lng())
    // restaurantsRef.push().set({
    //   name: 'tes click',
    //   latLng: { lat: latLng.lat(), lng: latLng.lng() },
    // })
  }
  handleCenterChanged() {
    const center = this._map.getCenter()
    this.setState({ center })
  }
  handleChooseLocation() {
    const mode = Modes.ADD_LOCATION
    this.setState(prev => ({
      mode,
      selectedLocation: prev.center
    }))
    this.handleToggleSidebar()
  }
  handleResetMode() {
    this.setState({
      mode: Modes.EXPLORE,
      selectedLocation: undefined,
      isSidebarActive: false,
    })
  }
  render() {
    const fullHeight = { height: '100%' }
    const mapContainer = <div id="map-container" style={fullHeight} />
    const mapElement = <div id="map-element" style={fullHeight} />

    const { selectedLocation, isSidebarActive, mode, myLocation, center, markers, selectedMarker } = this.state
    return (
      <div id="app-container" style={fullHeight}>
        <Sidebar
          onRemoveLocation={this.handleRemoveLocation}
          onUpdateLocation={this.handleUpdateLocation}
          onAddLocation={this.handleAddLocation}
          selectedMarker={selectedMarker}
          mode={mode}
          onResetMode={this.handleResetMode}
          onChangeMode={this.handleChangeMode}
          onClose={this.handleToggleSidebar}
          active={isSidebarActive} />
        <Navbar mode={mode} onCancel={this.handleResetMode} onToggle={this.handleToggleSidebar} />
        {mode === Modes.SELECT_LOCATION && <LocationSelector onClick={this.handleChooseLocation} />}
        <Map
          selectedLocation={selectedLocation}
          myLocation={myLocation}
          center={center}
          markers={markers}
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

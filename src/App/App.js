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
    this.handleCenterChanged  = this.handleCenterChanged.bind(this)
    this.handleToggleSidebar  = this.handleToggleSidebar.bind(this)
    this.handleChangeMode     = this.handleChangeMode.bind(this)
    this.handleChooseLocation = this.handleChooseLocation.bind(this)
    this.handleResetMode      = this.handleResetMode.bind(this)
    this.handleSelectionMode  = this.handleSelectionMode.bind(this)

    this.handleCreateLocation = this.handleCreateLocation.bind(this)
    this.handleUpdateLocation = this.handleUpdateLocation.bind(this)
    this.handleRemoveLocation = this.handleRemoveLocation.bind(this)
  }
  componentDidMount() {
    this.getCurrentPosition()
    this.handleRestaurantData()
  }
  handleCreateLocation({ name, img, menus }) {
    const { lat, lng } = this.state.selectedLocation
    const newRestaurant = restaurantsRef.push()

    newRestaurant.set({
      name,
      img,
      latLng: { lat: lat(), lng: lng() },
    })
      .then(_ => menus.map(m => newRestaurant.child('menus').push().set(m).then(_ => ({ ...m }))))
      .then(ps => Promise.all(ps))
      .then(this.handleResetMode)
  }
  handleUpdateLocation(restaurant) {
    const { id: restaurantId, name, img, latLng, menus } = restaurant
    const ps = menus.map(a => {
      const { id, name, price, img } = a

      if (!!id) {
        return Promise.resolve(a)
      }
      const m = restaurantsRef.child(restaurantId).child('menus').push()
      return m.set({ name, price, img, })
        .then(_ => ({
          id: m.key,
          ...a
        }))
    })
    Promise.all(ps).then(ms =>
      ms.reduce((b, { id, name, price, img }) => ({
        ...b,
        [id]: { name, price, img },
      }), {}))
        .then(menus =>
          restaurantsRef.child(restaurantId).set({
            name,
            img,
            latLng,
            menus,
          }))
        .then(this.handleResetMode)
  }
  handleRemoveLocation(id) {
    restaurantsRef.child(id).remove().then(_ => {
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
  }
  handleRestaurantData() {
    restaurantsRef.on('value', (snap) => {
      const restaurants = snap.val()
      if (!restaurants) return
      const mapMenus = menus => menus ? Object.keys(menus).map(id => ({
        id,
        img: menus[id].img,
        name: menus[id].name,
        price: menus[id].price,
      })) : []
      const markers = Object.keys(restaurants).map(id => ({
        id,
        img: restaurants[id].img,
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
        const center = this._map.getCenter()
        this.setState({
          center,
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
  handleSelectionMode() {
    this.handleChangeMode(Modes.SELECT_LOCATION)
    this.handleToggleSidebar()
  }
  render() {
    const fullHeight = { height: '100%' }
    const mapContainer = <div id="map-container" style={fullHeight} />
    const mapElement = <div id="map-element" style={fullHeight} />

    const { selectedLocation, isSidebarActive, mode, myLocation, center, markers, selectedMarker } = this.state
    return (
      <div id="app-container" style={fullHeight}>
        <Sidebar
          selectedMarker={selectedMarker}
          mode={mode}
          active={isSidebarActive}
          onSelectionMode={this.handleSelectionMode}
          onResetMode={this.handleResetMode}
          onChangeMode={this.handleChangeMode}
          onClose={this.handleToggleSidebar}
          onRemoveLocation={this.handleRemoveLocation}
          onUpdateLocation={this.handleUpdateLocation}
          onCreateLocation={this.handleCreateLocation}
        />
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
        />
      </div>
    )
  }
}

export default App

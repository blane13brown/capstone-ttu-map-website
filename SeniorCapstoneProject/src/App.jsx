import Header from './components/Header.jsx'
import MapSection from './components/MapSection.jsx'
import Footer from './components/Footer.jsx'
import Signin from './components/Signin.jsx'
import React from 'react'
import locationData from "./location-data.json"

function App() {

    //signed in user
    const [user, setuser] = React.useState(null)
    const [open, setopen] = React.useState(null)
    const toggleOpen = (state) => {
        setopen(state)
        document.getElementsByName("uname")[0].value = "";
        document.getElementsByName("pass")[0].value = "";
    }

    //used to focus on selected markers and center map on start
    const [MCenter, setMCenter] = React.useState({
        lat: 33.58446468105697,
        lng: -101.87468789605175
    })
    const [zoomLevel, setZoomLevel] = React.useState(15)

    //handles filters hiding and showing markers
    const [locationMarkers, setLocationMarkers] = React.useState(locationData)
    function toggle(category, switched) {
        // filter has been swtiched off
        if (switched === true) {
            setLocationMarkers(prevLocationMarkers => {
                return prevLocationMarkers.map((location) => {
                    activeMarker && category === activeMarker.category ? setActiveMarker(null) : null
                    activeMarker && user && user.favorites.indexOf(activeMarker.id) != -1 ? setActiveMarker(null) : null
                    if (category != "favorites" && user && user.favorites.indexOf(location.id) != -1) {
                        return location
                    }
                    if (location.category === category) {
                        return { ...location, visible: false }
                    } else if (category == "favorites" && user && user.favorites.indexOf(location.id) != -1) {
                        return { ...location, visible: false }
                    } else {
                        return location
                    }
                })
            })
            // filter has been switched on
        } else {
            setLocationMarkers(prevLocationMarkers => {
                return prevLocationMarkers.map((location) => {
                    if (category != "favorites" && user && user.favorites.indexOf(location.id) != -1) {
                        return location
                    }
                    if (location.category === category) {
                        return { ...location, visible: true }
                    } else if (category == "favorites" && user && user.favorites.indexOf(location.id) != -1) {
                        return { ...location, visible: true }
                    } else {
                        return location
                    }
                })
            })
        }

    }

    function favoriteLocation(id) {
        if (user) {
            let newFavorites = user.favorites
            newFavorites.push(id)
            setuser({ ...user, favorites: newFavorites })
        }
    }

    function unFavoriteLocation(id) {
        if (user) {
            let newFavorites = user.favorites
            newFavorites.splice(newFavorites.indexOf(id), 1)
            setuser({ ...user, favorites: newFavorites })
        }
    }

    //handles selecting a marker
    const [activeMarker, setActiveMarker] = React.useState(null)
    function dropToggle(id) {
        setLocationMarkers(prevLocationMarkers => {
            return prevLocationMarkers.map((location) => {
                if (location.id === id) {
                    setActiveMarker(location)
                }
                return location.id === id ? { ...location, visible: true } : location
            })
        })
    }


    return (
        <div className="container">
            <Header user={user} setopen={toggleOpen} setuser={setuser} />
            <Signin open={open} setopen={toggleOpen} setuser={setuser} />
            <MapSection center={MCenter}
                callBack={setMCenter}
                zoom={zoomLevel}
                zoomCallBack={setZoomLevel}
                toggle={toggle}
                locationMarkers={locationMarkers}
                setActiveMarker={setActiveMarker}
                activeMarker={activeMarker}
                user={user}
                data={locationData}
                favoriteLocation={favoriteLocation}
                unFavoriteLocation={unFavoriteLocation} />
            <Footer callBack={setMCenter} zoomCallBack={setZoomLevel} dropToggle={dropToggle} user={user} />
        </div>)
}

export default App

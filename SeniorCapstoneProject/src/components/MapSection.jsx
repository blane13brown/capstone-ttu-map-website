import React from 'react'
import FilterItem from './FilterItem'
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import DropdownItem from './DropdownItem'; //new


const MapSection = (props) => {
    const [map, setMap] = React.useState(null)

    const [open, setopen] = useState(props.cs) //new
    const toggleOpen = () => {                 //new
        setopen(!open)
    }

    //handles hiding and showing sidebar
    const [clicked, setClicked] = useState(true)
    const toggleSidebar = () => {
        setClicked((prevClicked) => !prevClicked)
    }

    const [options, setOptions] = React.useState({
        disableDefaultUI: true,
        minZoom: 15,
        mapId: "458fe68b808cb87c",
    })

    const [pos, setPos] = useState(null)
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPos(position)
            })
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    let infoWindow = null
    const markers = props.locationMarkers.map((location) => {
        let iconType
        let key = location.id
        if (props.user && props.user.favorites.indexOf(location.id) != -1) {
            key = `${location.id}f`
            iconType = "src/icons/heart.svg"
        } else if (props.user && props.user.registered.indexOf(location.id) != -1) {
            key = `${location.id}r`
            iconType = "src/icons/rlecture.svg"
        } else if (props.activeMarker && props.activeMarker.id === location.id) {
            key = `${location.id}a`
            if (location.category === "residence") {
                iconType = "src/icons/aresidence.svg"
            } else if (location.category === "lecture") {
                iconType = "src/icons/alecture.svg"
            } else if (location.category === "dining") {
                iconType = "src/icons/adining.svg"
            } else if (location.category === "pin_r") {
                iconType = "src/icons/pin_r.svg"
            } else if (location.category === "pin_g") {
                iconType = "src/icons/pin_g.svg"
            } else if (location.category === "pin_o") {
                iconType = "src/icons/pin_o.svg"
            }
        } else if (location.category === "residence") {
            iconType = "src/icons/residence.svg"
        } else if (location.category === "lecture") {
            iconType = "src/icons/lecture.svg"
        } else if (location.category === "dining") {
            iconType = "src/icons/dining.svg"
        } else if (location.category === "pin_r") {
            iconType = "src/icons/pin_r.svg"
        } else if (location.category === "pin_g") {
            iconType = "src/icons/pin_g.svg"
        } else if (location.category === "pin_o") {
            iconType = "src/icons/pin_o.svg"
        }
        return <MarkerF key={key}
            position={{ lat: Number(location.lat), lng: Number(location.lng) }}
            visible={location.visible}
            icon={iconType}
            title={location.name}
            onClick={() => { props.callBack({ lat: Number(location.lat), lng: Number(location.lng) }); props.zoomCallBack(18); props.setActiveMarker(location); }} />
    })

    // Search bar logic
    const [filteredData, setFilteredData] = useState([])
    const filterData = (event) => {
        const enteredText = event.target.value
        const newFilteredDataName = props.data.filter((location) => {
            return location.name.toLowerCase().includes(enteredText.toLowerCase())
        })
        const newFilteredDataAbbrev = props.data.filter((location) => {
            return location.abbrev.toLowerCase().includes(enteredText.toLowerCase())
        })
        let newFilteredData = newFilteredDataName.concat(newFilteredDataAbbrev)
        newFilteredData = [...new Set([...newFilteredDataName, ...newFilteredDataAbbrev])]

        enteredText == "" ? setFilteredData([]) : setFilteredData(newFilteredData)
    }

    // reg class logic //new
    // const regClasses = props.data.map(location => {
    //     if (props.user && props.user.registered.indexOf(location.id) != -1) {
    //         return <DropdownItem key={location.id}
    //             id={location.id}
    //             abbrev={location.abbrev}
    //             name={location.name}
    //             callBack={props.callBack}
    //             zoomCallBack={props.zoomCallBack}
    //             dropToggle={props.dropToggle}
    //             Mlat={location.lat}
    //             Mlng={location.lng}
    //         />
    //     }
    // })
    // console.log(regClasses)

    // {props.user && (<div>
    //     <div className="reg-dropdown">
    //         <p className={open ? "active" : "closed"} onClick={toggleOpen}><i className={open ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i>Registered Classes</p>
    //         <ul className={open ? "dropdown-list" : "dropdown-list hidden"}>
    //             {regClasses}
    //         </ul>
    //     </div>
    // </div>)}

    return (
        <section className='map-content'>
            <LoadScript
                googleMapsApiKey="AIzaSyDD9qFIefu1Po1AbhLBFpv0bz6gEa5C4Ng"
            >
                <GoogleMap
                    onLoad={map => {
                        setMap(map);
                        setOptions({
                            zoomControl: true,
                            zoomControlOptions: {
                                position: google.maps.ControlPosition.LEFT_CENTER,
                            },
                            streetViewControl: true,
                            streetViewControlOptions: {
                                position: google.maps.ControlPosition.LEFT_CENTER,
                            },
                            mapTypeControl: true,
                            mapTypeControlOptions: {
                                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                                position: google.maps.ControlPosition.TOP_LEFT,
                            },
                            zoom: 17,
                        });
                        map.setOptions(options)
                    }}
                    center={props.center}
                    zoom={props.zoom}
                    mapContainerClassName="map"
                    options={options}
                    onMouseMove={() => props.zoomCallBack(map.getZoom())}

                >
                    {markers}
                    {pos ? <MarkerF
                        position={{ lat: pos.coords.latitude, lng: pos.coords.longitude }}
                        icon="src/icons/pos.svg"
                        title="Current Position" /> : null}


                </GoogleMap>
            </LoadScript>
            <div className="controls">
                <span className={clicked ? "topper" : "topper hidden"} onClick={toggleSidebar}>
                    <i id="toggle-button" className={clicked ? "fa-solid fa-caret-right" : "fa-solid fa-caret-left"}></i>
                    <h2 id="toggle-text" className="list-header">{clicked ? "Hide Map Controls" : "Show Map Controls"}</h2>
                </span>
                <div id='content' className={clicked ? "#content" : "#content hidden"}>
                    <div className="search">
                        <div id="search">
                            <input type="text" onChange={filterData} placeholder='Search a location' />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        {filteredData.length != 0 && (
                            <div className="results">
                                {filteredData.slice(0, 10).map((location) => {
                                    return <div className={props.activeMarker == location ? "result r-active" : "result"} key={location.id} onClick={() => { props.callBack({ lat: Number(location.lat), lng: Number(location.lng) }); props.zoomCallBack(18); props.setActiveMarker(location); }}>
                                        <span className={location.abbrev ? "search-abbrev" : ""}>{location.abbrev}</span> {location.name}</div>
                                })}
                            </div>
                        )}
                    </div>
                    <button className='get-loc' onClick={() => { getLocation(), props.callBack({ lat: pos.coords.latitude, lng: pos.coords.longitude }), props.zoomCallBack(18) }}>Get Current Location</button>
                    <h2 className="list-header">Location Information</h2>
                    <div className='info-container'>
                        {props.activeMarker ?
                            <div className='info'>
                                {props.activeMarker.image === "" ? null : <img src={props.activeMarker.image} />}
                                <h3>Name: <span>{props.activeMarker.name}</span></h3>
                                {props.activeMarker.abbrev === "" ? null : <h3>Abbreviation: <span>{props.activeMarker.abbrev}</span></h3>}
                                <h3>Description: <span>{props.activeMarker.description}</span></h3>
                                {props.user && props.user.registered.indexOf(props.activeMarker.id) != -1 && (<div>
                                    <h3>Registration: <span>You are currently enrolled for a class located in this building.</span></h3>
                                </div>)}
                                {props.user != null && props.activeMarker != null ?
                                    <button onClick={props.user.favorites.indexOf(props.activeMarker.id) != -1 ? () => props.unFavoriteLocation(props.activeMarker.id) : () => props.favoriteLocation(props.activeMarker.id)}>
                                        {props.user.favorites.indexOf(props.activeMarker.id) != -1 ? "Remove From Favorites" : "Add To Favorites"}</button> : null}
                            </div> : <p className='placeholder'>Select a location to find out more about it</p>}
                    </div>
                    <div className="filters">
                        <h2 className="list-header">Student</h2>
                        <ul>
                            {props.user ? <FilterItem cn="fa-solid fa-heart" label="Favorites" color="rgb(253, 45, 97)" toggle={props.toggle} category="favorites" /> : null}
                            <FilterItem cn="fa-solid fa-house-chimney" label="Residence Halls" toggle={props.toggle} category="residence" />
                            <FilterItem cn="fa-solid fa-graduation-cap" label="Lecture Halls" toggle={props.toggle} category="lecture" />
                            <FilterItem cn="fa-solid fa-utensils" label="Dining Halls" toggle={props.toggle} category="dining" />
                        </ul>
                        <h2 className="list-header">Transportation</h2>
                        <ul>
                            <FilterItem cn="fa-solid fa-bus" label="Bus Stops" toggle={props.toggle} />
                            <FilterItem cn="fa-solid fa-square-parking" label="Parking" color="rgb(78, 160, 255)" toggle={props.toggle} />
                            <FilterItem cn="fa-solid fa-bolt-lightning" label="Electric Scooter Hub" color="rgb(239, 255, 96)" toggle={props.toggle} />
                            <FilterItem cn="fa-solid fa-location-dot" label="Campus Entry" color="rgb(255, 51, 51)" category="pin_r" toggle={props.toggle} />
                        </ul>
                        <h2 className="list-header">Other</h2>
                        <ul>
                            <FilterItem cn="fa-solid fa-location-dot" label="Notable Locations" color="rgb(253, 156, 45)" category="pin_o" toggle={props.toggle} />
                            <FilterItem cn="fa-solid fa-location-dot" label="Public Art" color="rgb(16, 179, 65)" category="pin_g" toggle={props.toggle} />
                            <FilterItem cn="fa-solid fa-square-phone" label="Emergency Phones" color="rgb(116, 255, 248)" toggle={props.toggle} />
                            <FilterItem cn="fa-solid fa-person-breastfeeding" label="Mother Friendly" color="rgb(237, 98, 255)" toggle={props.toggle} />
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MapSection
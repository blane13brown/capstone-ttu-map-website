import React from 'react'
import { useState } from "react";
import DropdownItem from './DropdownItem'
import locationData from "../location-data.json"

const Dropdown = (props) => {
    //handles hiding and showing dropdown
    const [open, setopen] = useState(props.cs)
    const toggleOpen = () => {
        setopen(!open)
    }

    const dropdownLocations = locationData.map(location => {
        if (location.category == props.category) {
            return <DropdownItem key={location.id}
                id={location.id}
                abbrev={location.abbrev}
                name={location.name}
                callBack={props.callBack}
                zoomCallBack={props.zoomCallBack}
                dropToggle={props.dropToggle}
                Mlat={location.lat}
                Mlng={location.lng}
            />
        } else if (props.category == "favorites" && props.user && props.user.favorites.indexOf(location.id) != -1) {
            return <DropdownItem key={location.id}
                id={location.id}
                abbrev={location.abbrev}
                name={location.name}
                callBack={props.callBack}
                zoomCallBack={props.zoomCallBack}
                dropToggle={props.dropToggle}
                Mlat={location.lat}
                Mlng={location.lng}
            />
        } else {
            return null
        }
    })

    return (
        <div className="dropdown">
            <p className={open ? "active" : "closed"} onClick={toggleOpen}><i className={open ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i>{props.headertext}</p>
            <ul className={open ? "dropdown-list" : "dropdown-list hidden"}>
                {dropdownLocations.every(loc => loc === null) ? <DropdownItem name="Empty" /> : dropdownLocations}
            </ul>
        </div>
    )
}

export default Dropdown
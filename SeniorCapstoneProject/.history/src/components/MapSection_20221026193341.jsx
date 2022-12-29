import React from 'react'
import FilterItem from './FilterItem'
import { Component } from 'react'

class MapSection extends Component {
    //handles hiding and showing sidebar
    state = { clicked: true };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <section className='map-content'>
                <div id='map'>
                    {
                        //Put google map stuff here
                    }
                </div>
                <div className="controls">
                    <span className={this.state.clicked ? "topper" : "topper hidden"} onClick={this.handleClick}>
                        <i id="toggle-button" className={this.state.clicked ? "fa-solid fa-caret-right" : "fa-solid fa-caret-left"}></i>
                        <h2 id="toggle-text" className="list-header">{this.state.clicked ? "Hide Map Controls" : "Show Map Controls"}</h2>
                    </span>
                    <div id='content' className={this.state.clicked ? "#content" : "#content hidden"}>
                        <form id="search">
                            <input type="text" placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </form>
                        <div className="filters">
                            <h2 className="list-header">Student</h2>
                            <ul>
                                <FilterItem cn="fa-solid fa-heart" label="Favorites" color="rgb(253, 45, 97)" />
                                <FilterItem cn="fa-solid fa-house-chimney" label="Residence Halls" />
                                <FilterItem cn="fa-solid fa-graduation-cap" label="Lecture Halls" />
                                <FilterItem cn="fa-solid fa-utensils" label="Dining Halls" />
                            </ul>
                            <h2 className="list-header">Transportation</h2>
                            <ul>
                                <FilterItem cn="fa-solid fa-bus" label="Bus Stops" />
                                <FilterItem cn="fa-solid fa-square-parking" label="Parking" color="rgb(78, 160, 255)" />
                                <FilterItem cn="fa-solid fa-bolt-lightning" label="Electric Scooter Hub" color="rgb(239, 255, 96)" />
                                <FilterItem cn="fa-solid fa-location-dot" label="Campus Entry" color="rgb(255, 51, 51)" />
                            </ul>
                            <h2 className="list-header">Other</h2>
                            <ul>
                                <FilterItem cn="fa-solid fa-location-dot" label="Notable Locations" color="rgb(253, 156, 45)" />
                                <FilterItem cn="fa-solid fa-location-dot" label="Public Art" color="rgb(142, 255, 97)" />
                                <FilterItem cn="fa-solid fa-square-phone" label="Emergency Phones" color="rgb(116, 255, 248)" />
                                <FilterItem cn="fa-solid fa-person-breastfeeding" label="Mother Friendly" color="rgb(237, 98, 255)" />
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default MapSection
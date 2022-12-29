import React from 'react'
import Dropdown from './Dropdown'

const Footer = (props) => {
    return (
        <section className='footer'>
            <h2>View All Locations</h2>
            <div className="dropdown-container">
                <Dropdown headertext="Lecture Halls" cs={true} category="lecture" callBack={props.callBack} zoomCallBack={props.zoomCallBack} dropToggle={props.dropToggle} />
                <Dropdown headertext="Residence Halls" cs={false} category="residence" callBack={props.callBack} zoomCallBack={props.zoomCallBack} dropToggle={props.dropToggle} />
                <Dropdown headertext="Dining Halls" cs={false} category="dining" callBack={props.callBack} zoomCallBack={props.zoomCallBack} dropToggle={props.dropToggle} />
                <Dropdown headertext="Favorites" cs={false} category="favorites" callBack={props.callBack} zoomCallBack={props.zoomCallBack} dropToggle={props.dropToggle} user={props.user} />
            </div>
        </section>
    )
}

export default Footer
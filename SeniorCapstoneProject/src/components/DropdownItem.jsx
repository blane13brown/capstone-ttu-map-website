import React from 'react'

const DropdownItem = (props) => {

    return (
        <li onClick={() => {
            props.callBack({
                lat: Number(props.Mlat),
                lng: Number(props.Mlng),
            });
            props.zoomCallBack(18);
            props.dropToggle(props.id);
        }}>
            <span className={props.abbrev ? "abbrev" : ""}>{props.abbrev}</span>
            <span className='list-txt'>{props.name}</span>
        </li >
    )
}

export default DropdownItem
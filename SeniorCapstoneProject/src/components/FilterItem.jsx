import React from 'react'
import { useState } from "react";

const FilterItem = (props) => {

    const [switched, setSwitched] = useState(true)
    const toggleSwitch = () => {
        setSwitched((switched) => !switched)
    }


    return (
        <div className='list-item'>
            <div>
                <i className={props.cn} style={{ color: props.color }}></i>
                <p>{props.label}</p>
            </div>
            <label className="switch">
                <input type="checkbox" defaultChecked={switched} onClick={() => { toggleSwitch(); props.toggle(props.category, switched); }} />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default FilterItem
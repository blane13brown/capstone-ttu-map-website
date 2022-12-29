import React from 'react'

const InfoPopup = (props) => {
    return (
        <section>
            <div className='info-container'>
                <h2>{props.name}</h2>
                <h2 className='close'>X</h2>
            </div>
        </section>
    )
}

export default InfoPopup
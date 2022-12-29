import React from 'react'
import Logo from './images/ttu-logo.png'

const Header = (props) => {
    return (
        <header>
            <img id="logo" src={Logo} />
            <a href="#" id="sign-in" onClick={() => { props.setopen(true); props.user ? props.setuser(null) : null }}>{props.user ? "Sign-Out" : "Sign-In"}<i className="fa-solid fa-chevron-right"></i></a>
            <p>{props.user ? `Welcome back, ${props.user.name}` : ""}</p>
        </header>
    )
}

export default Header
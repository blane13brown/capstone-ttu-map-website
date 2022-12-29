import React from 'react'
import { useState } from "react";
import users from "../user.json"

const Signin = (props) => {

    const [view, setview] = useState(true)
    const toggleView = () => {
        setview(!view)
    }

    // login States
    const [errorMessages, setErrorMessages] = useState({});

    //Invalid statemant
    const errors = {
        uname: "Invalid username",
        pass: "Invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload when the wrong password or username is entered
        event.preventDefault();

        //User input values
        const inputUser = document.getElementsByName("uname")[0].value
        const inputPass = document.getElementsByName("pass")[0].value

        // Find if user exist
        let userData
        for (let user of users) {
            if (inputUser === user.username) {
                userData = user
            }
        }

        // Compare user info
        if (userData) {
            if (userData.password !== inputPass) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                props.setopen(false)
                props.setuser(userData)
                setErrorMessages({})
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className={`error${name === "uname" ? "u" : "p"}`}>{errorMessages.message}</div>
        );

    return (
        <div className={props.open ? "signin-container" : "signin-container closed"}>
            <div className="signin-pop">
                <i className="fa-solid fa-xmark" onClick={() => { props.setopen(false) }}></i>
                <h2>Sign In</h2>
                <form action="#" onSubmit={handleSubmit}>
                    <input type="text" className='username' name="uname" placeholder='Enter Your Username' />
                    {renderErrorMessage("uname")}
                    <br />
                    <input type={view ? "password" : "text"} className='password' name="pass" placeholder='Enter Your Password' />
                    {renderErrorMessage("pass")}
                    <i className="fa-solid fa-eye" onClick={toggleView}></i>
                    <br />
                    <input type="submit" value="SUBMIT" />
                </form>
            </div>
            <div className="blur"></div>
        </div>
    )
}

export default Signin
import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {
    return (
        <div>
            <h1>Welcome home </h1>
            <div className="home">
            <Link to="/register"> go for register</Link>
            <Link to="/login"> go for login</Link>
            <Link to="/messenger"> go for chat</Link>
            </div>
        </div>
    )
}

export default Home

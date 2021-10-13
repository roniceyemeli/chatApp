import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import {Link} from "react-router-dom"
import Loading from '../../components/loading/Loading';
import { register } from '../../redux/actions';

const Register = () => {
    const {loading,user} = useSelector(state => state);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const registerSubmit = async(e) => {
        e.preventDefault()
        dispatch(register({ username, email, password }));
        setUsername("");
        setEmail("");
        setPassword("");
    }


    return (
        <div className={loading ? "" : "login-page"}>
            {
                loading ? <Loading/> : user ?
                <Redirect to = "login"/> :
                <>
                <h2>Register</h2>
                <form onSubmit={registerSubmit}>

                    <input type="text" name="name" required 
                    placeholder="Enter your username" value={username}
                    onChange={(e) => setUsername(e.target.value)} autoComplete="off" />

                    <input type="email" name="email" required 
                    placeholder="Enter your email" value={email}
                    onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
    
                    <input type="password" name="password" required 
                    placeholder="Enter your password" value={password}
                    onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
    
                    <div className="row">
                        <button type="submit">Register</button>
                        <Link to="/login"><span>login</span></Link>
                    </div>
                </form>
                </>
            }
        </div>
        )
}

export default Register

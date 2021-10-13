import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../../redux/actions';
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom"
import Loading from '../../components/loading/Loading';


const Login = () => {
  const {loading, token} = useSelector(state => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({email, password}));
    setEmail("");
    setPassword("");
  };



    return (
        <div className={loading ? "" : "login-page"}>
            {
            loading ? <Loading/> : token ?
            <Redirect to="/messenger"/> :
            <>
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <input type="email" name="email" required 
                placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>

                <span>
                    <input type="password" name="password" required 
                placeholder="Enter your password" value={password}
                onChange={(e) => setPassword(e.target.value)} autoComplete="off" id='inputPassword'/>
                </span>

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register"><span>register</span></Link>
                </div>
            </form>
            </>
            }
        </div>
    )
}

export default Login


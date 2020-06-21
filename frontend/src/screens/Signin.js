import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';
import spinner from './layout/spinner.gif';

export default function Signin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => { };
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign In</h2>
          </li>
          <li>
            {loading && <img className="spinner" src={spinner} alt='Loading...' />}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </li>
          <li>
            <button type="submit" className="button primary">Sign In</button>
          </li>
          <li>
            New user? <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center">Create new account</Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import spinner from './layout/spinner.gif';

export default function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;
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
    if (password !== rePassword) {
      //return error
    } else {
      dispatch(register(name, email, password));
    }
  }

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Register new account</h2>
          </li>
          <li>
            {loading && <img className="spinner" src={spinner} alt='Loading...' />}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
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
            <label htmlFor="rePassword">Confirm password</label>
            <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} />
          </li>
          <li>
            <button type="submit" className="button primary">Register new account</button>
          </li>
          <li>
            Already have an account?
            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center">Sign In</Link>
          </li>
        </ul>
      </form>
    </div>
  )
}

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Shipping(props) {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [postal, setPostal] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address1, address2, postal, phone }));
    props.history.push('payment')
  }

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Shipping Details</h2>
            </li>
            <li>
              <label htmlFor="address1">Address Line 1</label>
              <input type="text" name="address1" id="address1" onChange={(e) => setAddress1(e.target.value)} />
            </li>
            <li>
              <label htmlFor="address2">Address Line 2</label>
              <input type="text" name="address2" id="address2" onChange={(e) => setAddress2(e.target.value)} />
            </li>
            <li>
              <label htmlFor="postal">Postal</label>
              <input type="text" name="postal" id="postal" onChange={(e) => setPostal(e.target.value)} />
            </li>
            <li>
              <label htmlFor="phone">Hand phone</label>
              <input type="text" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} />
            </li>
            <li>
              <button type="submit" className="button primary">Continue</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  )
}

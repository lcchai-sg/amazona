import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function Payment(props) {
  const [paymentMethod, setPaymentMethod] = useState('Paynow');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder')
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input type="radio" name="paymentMethod" id="paymentMethod"
                  value="Paynow" checked="checked" onChange={(e) => setPaymentMethod(e.target.value)} />
                <label htmlFor="paymentMethod">
                  {" "}Paynow
                </label>
              </div>
              <div>
                <input type="radio" name="paymentMethod" id="paymentMethod"
                  value="C.O.D." onChange={(e) => setPaymentMethod(e.target.value)} />
                <label htmlFor="paymentMethod">
                  {" "}C.O.D.
                </label>
              </div>
              <div>
                <input type="radio" name="paymentMethod" id="paymentMethod"
                  value="On Credit" onChange={(e) => setPaymentMethod(e.target.value)} />
                <label htmlFor="paymentMethod">
                  {" "}On Credit
                </label>
              </div>
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

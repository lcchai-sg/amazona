import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrder(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart;
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  if (!shipping.address1) {
    props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    props.history.push('/payment');
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }

  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            {cart.shipping &&
              <div>
                {cart.shipping.address1}{cart.shipping.address1 && <br />}
                {cart.shipping.address2}{cart.shipping.address2 && <br />}
                Singapore {cart.shipping.postal}<br /><br />
                HP: {cart.shipping.phone}<br />
              </div>
            }
          </div>
          <div>
            <h3>Payment</h3>
            {cart.shipping &&
              <div>
                Payment: {cart.payment.paymentMethod}
              </div>
            }
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {
                cartItems.length === 0 ?
                  <div><b>Cart is empty.</b></div> :
                  cartItems.map(item =>
                    <li key={item.id}>
                      <div className="cart-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.id}>{item.name}</Link>
                        </div>
                        <div>Qty: {item.qty}</div>
                      </div>
                      <div className="cart-price"><b>${item.price.toFixed(2)}</b></div>
                    </li>
                  )
              }
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button onClick={placeOrderHandler}
                className="button primary" disabled={cartItems.length === 0}>
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>{shippingPrice > 0 ? '$' + shippingPrice.toFixed(2) : 'Free'}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice.toFixed(2)}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice.toFixed(2)}</div>
            </li>
          </ul>
        </div>
      </div>
    </div >
  )
}

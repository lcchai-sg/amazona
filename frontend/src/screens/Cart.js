import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Cart(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const removeFromCartHandler = productId => {
    dispatch(removeFromCart(productId));
  }

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [])

  return (
    <div className="cart">
      <div className="cart-list">
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
                    <div>
                      Qty:
                      <select value={item.qty} onChange={(e) => dispatch(addToCart(item.id, e.target.value))}>
                        {item.onHand < 10 ?
                          [...Array(item.onHand).keys()].map(x =>
                            <option value={x + 1} key={x + 1}>{x + 1}</option>
                          )
                          : [...Array(10).keys()].map(x =>
                            <option value={x + 1} key={x + 1}>{x + 1}</option>
                          )}
                      </select>
                      <button className="button" type="button" onClick={() => removeFromCartHandler(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="cart-price"><b>${item.price.toFixed(2)}</b></div>
                </li>
              )
          }
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items )
          :
          $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
        </h3>
        <button onClick={checkoutHandler} className="button primary" disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

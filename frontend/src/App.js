import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Signin from './screens/Signin';
import Register from './screens/Register';
import ProductAdmin from './screens/ProductAdmin';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import Profile from './screens/Profile';
import OrderAdmin from './screens/OrderAdmin';

function App() {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Tick Green</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Login</Link>
            }
            {
              userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <a href="#">Admin</a>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orders">Orders</Link>
                      <Link to="/products">Products</Link>
                    </li>
                  </ul>
                </div>
              )
            }
          </div>
        </header>
        <aside className="sidebar">
          <h3 className="sidebar-h3">Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul>
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/category/shirts">Shirts</Link>
            </li>
            <li>
              <Link to="/category/pants">Pants</Link>
            </li>
            <li>
              <Link to="/category/shorts">Shorts</Link>
            </li>
            <li>
              <Link to="/category/undergarments">Under Garments</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrderAdmin} />
            <Route path="/profile" component={Profile} />
            <Route path="/order/:id" component={Order} />
            <Route path="/products" component={ProductAdmin} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/payment" component={Payment} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/register" component={Register} />
            <Route path="/signin" component={Signin} />
            <Route path="/product/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">
          All rights reserved.
      </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

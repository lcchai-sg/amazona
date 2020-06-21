import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import spinner from './layout/spinner.gif';

export default function Product(props) {
  const id = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(id));
    return () => { };
  }, [])

  const handleAddToCart = () => {
    props.history.push("/cart/" + id + "?qty=" + qty);
  }

  return (
    loading ? <img className="spinner" src={spinner} alt='Loading...' /> :
      error ? <div>{error}</div> :
        <div>
          <div className="back-to-result">
            <Link to="/">Back to result</Link>
          </div>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="details-info">
              <ul>
                <li><h4>{product.name}</h4></li>
                <li>
                  {product.rating} Stars ({product.numReviews} Reviews)
                </li>
                <li>
                  Price: <b>${product.price && product.price.toFixed(2)}</b>
                </li>
                <li>
                  Description: <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  Price: <b>${product.price && product.price.toFixed(2)}</b>
                </li>
                <li>
                  Delivery: {product.isFreeShipping ? <b>Free</b> : <b>$8.00</b>}
                </li>
                <li>
                  {
                    product.onHand <= 0 ?
                      <b>Out of Stock.</b> :
                      <>
                        Qty:
                        <select value={qty} onChange={(e) => { setQty(e.target.value); }}>
                          {product.onHand < 10 ?
                            [...Array(product.onHand).keys()].map(x =>
                              <option value={x + 1} key={x + 1}>{x + 1}</option>
                            )
                            : [...Array(10).keys()].map(x =>
                              <option value={x + 1} key={x + 1}>{x + 1}</option>
                            )}
                        </select>
                      </>
                  }
                </li>
                <li>
                  {
                    product.onHand > 0 &&
                    <button className="button primary" onClick={handleAddToCart}>Add To Cart</button>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div >
  )
}

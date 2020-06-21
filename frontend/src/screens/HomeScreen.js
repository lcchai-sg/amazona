import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import spinner from './layout/spinner.gif';

export default function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
    return () => { };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  }

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, e.target.value));
  }

  return (
    <>
      {
        category && <h2>{category}</h2>
      }
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
            {" "}
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By {' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>

      {
        loading ? <img className="spinner" src={spinner} alt='Loading...' /> :
          error ? <div>{error}</div> :
            <ul className="products">
              {
                products.map(product =>
                  <li key={product.id}>
                    <div className="product">
                      <Link to={'/product/' + product.id}>
                        <img className="product-image" src={product.image} alt={product.name} />
                      </Link>
                      <div className="product-name">
                        <Link to={'/product/' + product.id}>{product.name}</Link>
                      </div>
                      <div className="product-brand">{product.brand}</div>
                      <div className="product-price">${`${product.price.toFixed(2)}`}</div>
                      <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
                    </div>
                  </li>
                )
              }
            </ul>
      }
    </>
  )
}

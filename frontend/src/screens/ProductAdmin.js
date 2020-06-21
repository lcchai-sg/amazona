import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import spinner from './layout/spinner.gif';

export default function ProductAdmin(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [availableSizes, setAvailableSizes] = useState('');
  const [price, setPrice] = useState('');
  const [original, setOriginal] = useState('');
  const [isFreeShipping, setIsFreeShipping] = useState('');
  const [image, setImage] = useState('');
  const [onHand, setOnHand] = useState('');
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  const productSave = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => { };
  }, [successSave, successDelete])

  const openModal = product => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setBrand(product.brand);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setOriginal(product.original);
    setIsFreeShipping(product.isFreeShipping);
    setImage(product.image);
    setOnHand(product.onHand);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name, brand, category, description, availableSizes, price,
      original, isFreeShipping, image, onHand
    }));
  }

  const deleteHandler = product => {
    dispatch(deleteProduct(product._id));
  }

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>Create New Product</button>
      </div>

      {modalVisible &&
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>{id ? "Update Product" : "Create New Product"}</h2>
              </li>
              <li>
                {loadingSave && <img className="spinner" src={spinner} alt='Loading...' />}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Product name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </li>
              <li>
                <label htmlFor="category">Product category</label>
                <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </li>
              <li>
                <label htmlFor="description">Product description</label>
                <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </li>
              {/* availableSizes */}
              <li>
                <label htmlFor="price">Selling Price</label>
                <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </li>
              <li>
                <label htmlFor="original">Original price</label>
                <input type="text" name="original" id="original" value={original} onChange={(e) => setOriginal(e.target.value)} />
              </li>
              <li>
                <label htmlFor="isFreeShipping">Delivery</label>
                <input type="text" name="isFreeShipping" id="isFreeShipping" value={isFreeShipping} onChange={(e) => setIsFreeShipping(e.target.value)} />
              </li>
              <li>
                <label htmlFor="image">Product image</label>
                <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
              </li>
              <li>
                <label htmlFor="onHand">Current stock</label>
                <input type="text" name="onHand" id="onHand" value={onHand} onChange={(e) => setOnHand(e.target.value)} />
              </li>
              <li>
                <button type="submit" onClick={(e) => submitHandler(e)} className="button primary">{id ? "Update Product" : "Create Product"}</button>
              </li>
              <li>
                <button type="submit" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
              </li>
            </ul>
          </form>
        </div>
      }
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Brand</td>
              <td>Category</td>
              <td>Description</td>
              <td>Price</td>
              <td>Image</td>
              <td>Stock</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.image}</td>
                <td>{product.onHand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>Edit</button>
                  {" "}
                  <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

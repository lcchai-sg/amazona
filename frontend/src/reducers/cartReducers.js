import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from '../constants/cartConstants';

const cartReducer = (state = { cartItems: [], shipping: {}, payment: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(x => x.id === item.id);
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.id === item.id ? item : x),
        }
      }
      return { ...state, cartItems: [...state.cartItems, item], };
    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.id !== action.payload),
      }
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload, };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload, };
    default:
      return state;
  }
}

export { cartReducer };
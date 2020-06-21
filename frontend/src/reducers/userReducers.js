import cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
} from '../constants/userConstants';

const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true, };
    case USER_SIGNIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, };
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload, };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default: return state;
  }
}

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload, };
    default:
      return state;
  }
}

export { userSigninReducer, userRegisterReducer, userUpdateReducer };
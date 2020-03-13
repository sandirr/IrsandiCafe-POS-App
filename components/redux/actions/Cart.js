import axios from 'axios';
import {URI} from 'react-native-dotenv';

export const postCart = data => {
  return {
    type: 'POST_CART',
    payload: {data},
  };
};

export const manipulateQuantity = data => {
  return {
    type: 'MANIPULATE_QUANTITY',
    payload: {data},
  };
};

export const deleteFromCart = id => {
  return {
    type: 'DELETE_FROM_CART',
    payload: {id},
  };
};

export const checkout = data => {
  return {
    type: 'CHECKOUT',
    payload: axios({
      method: 'POST',
      url: `${URI}purchase`,
      data: data,
    }),
  };
};

import axios from 'axios';
// import uniqid from 'uniqid';

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
  // data.idBuyer = `${uniqid()}`;
  return {
    type: 'CHECKOUT',
    payload: axios({
      method: 'POST',
      url: 'http://192.168.1.12:8181/purchase',
      data: data,
    }),
  };
};

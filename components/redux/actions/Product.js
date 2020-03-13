import axios from 'axios';
import {URI} from 'react-native-dotenv';

export const getProducts = data => {
  const limit = data.limit || 3;
  const page = data.activePage || 1;
  const category = data.activeCategory || '';
  const name = data.serachName || '';
  const sort = data.sort || 'ASC';
  const by = data.by || 'id';
  const user = data.user || 'admin';
  return {
    type: 'GET_PRODUCT',
    payload: axios({
      method: 'GET',
      url: `${URI}product/?limit=${limit}&page=${page}&category=${category}&name=${name}&sort=${sort}&by=${by}&user=${user}`,
    }),
  };
};

export const postProduct = data => {
  return {
    type: 'POST_PRODUCT',
    payload: axios({
      method: 'POST',
      url: `${URI}product`,
      data: data,
    }),
  };
};

export const patchProduct = (newData, id) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: `${URI}product/` + id,
      data: newData,
    }),
  };
};

export const deleteProduct = id => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: `${URI}product/` + id,
    }),
  };
};

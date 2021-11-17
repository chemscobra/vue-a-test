import Axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_API_HOST;

const axios = Axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
  }
});

export default {
  listCategories(params) {
    return axios.get('/categories', {
      params: params
    });
  },
  listItems(params) {
    return axios.get('/items', {
      params: params
    });
  },
  getItem(itemId) {
    return axios.get(`/item/${itemId}`);
  },
  updateItem(payload) {
    return axios.put(`/item`, payload);
  },
  createItem(payload) {
    return axios.post('/item', payload);
  },
  deleteItem(itemId) {
    return axios.delete(`/item/${itemId}`);
  }
};

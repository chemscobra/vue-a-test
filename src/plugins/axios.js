import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API_HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
  }
});

export default axios;

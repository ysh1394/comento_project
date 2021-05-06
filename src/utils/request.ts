import axios from 'axios';
// import store from '@/store';

const BaseURL: string = 'https://problem.comento.kr';

// create an axios instance
const service = axios.create({
  baseURL: BaseURL,
  headers: {
    Accept: 'application/json',
  },
  // timeout: 5000, // request timeout
  // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
});

export default service;

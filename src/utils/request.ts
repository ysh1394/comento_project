import axios from 'axios';

const BaseURL: string = 'https://problem.comento.kr';

// create an axios instance
const service = axios.create({
  baseURL: BaseURL,
  headers: {
    Accept: 'application/json',
  },
});

export default service;

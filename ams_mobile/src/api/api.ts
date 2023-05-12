import axios from 'axios';
import { ApiConstants } from './ApiConstants'
export const API = axios.create({ baseURL: ApiConstants.BASE_URL, validateStatus: function (status) {
  return status == 200;
} });

export const get = async (endpoint: string, options = {}) => {
  return API.get(endpoint, options).catch((e) => e.toJSON());
};

export const post = async (endpoint: string, body: object, options = {}) => {
  return API.post(endpoint, body, options).catch((e) => e.toJSON());
};

export const patch = async (params) => {
  return await API.patch(params.endpoint, params.options).catch((e) => e.toJSON());
};

export const put = async (params) => {
  return await API.put(params.endpoint, params.options).catch((e) => e.toJSON());
};

export const drop = async (params) => {
  return await API.delete(params.endpoint, params.options).catch((e) => e.toJSON());
};
import axios from 'axios';
import { host } from './helpers';

export const API = axios.create({
  baseURL: host,
  responseType: 'json',
});

export const getSuggestions = async (searchQuery: string) => {
  return await API.get(`/suggestions?search=${searchQuery}`);
};

export const getInfos = async (url: string) => {
  return await API.get(`/metainfo?url=${url}`);
};

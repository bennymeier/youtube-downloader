import axios from 'axios';
import { host } from './helpers';

export const API = axios.create({
  baseURL: host,
  responseType: 'json',
});

export const getSuggestions = async (searchQuery: string, results?: number) => {
  const { data } = await API.get(
    `/suggestions?search=${searchQuery}${results ? `&results=${results}` : ''}`
  );
  return data;
};

export const getInfos = async (url: string) => {
  const { data } = await API.get(`/metainfo?url=${url}`);
  return data;
};

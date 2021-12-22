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

export const createSearchStatistic = async (search: any) => {
  try {
    const { data } = await API.post<any>('/api/search', search);
    return data;
  } catch (err) {
    return err;
  }
};

export const createDownloadStatistic = async (download: any) => {
  try {
    const { data } = await API.post<any>('/api/download', download);
    return data;
  } catch (err) {
    return err;
  }
};

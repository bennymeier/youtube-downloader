import axios from 'axios';
import { host } from './helpers';

export const API = axios.create({
  baseURL: host,
  responseType: 'json',
});

export const getFormats = async (videoURL: string) => {
  return await API.get(`/formats?url=${encodeURIComponent(videoURL)}`);
};

export const getSuggestions = async (
  searchQuery: string,
  nextPageToken: string = ''
) => {
  return await API.get(
    `/suggestions?search=${searchQuery}&next=${nextPageToken}`
  );
};

export const getInfos = async (url: string) => {
  return await API.get(`/metainfo?url=${url}`);
};

export const sendContactForm = async (formData: { email: string, issueType: string, description: string }) => {
  return await API.post(`/contact`, formData);
};

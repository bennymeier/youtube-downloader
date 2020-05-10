import axios from "axios";
import { host } from "./helpers";

export const API = axios.create({
  baseURL: host,
  responseType: "json",
});

export const getSuggestions = async (searchQuery) => {
  const { data } = await API.get(`/suggestions?search=${searchQuery}`);
  return data;
};

export const getInfos = async (url) => {
  const { data } = await API.get(`/metainfo?url=${url}`);
  return data;
};

import { config } from "./config";
import axios from "axios";

const apiurl = config.apiurl;

export const CallGetApiServicesWithTkn = (
  url,
  data,
  successCallBack,
  errorCallBack
) => {
  axios.get(`${apiurl}${url}`, data).then(successCallBack).catch(errorCallBack);
};

export const CallGetApiServices = (url, successCallBack, errorCallBack) => {
  axios.get(`${apiurl}${url}`).then(successCallBack).catch(errorCallBack);
};

export const CallPostApiServicesWithTkn = (
  url,
  data,
  headers,
  successCallBack,
  errorCallBack
) => {
  axios
    .post(`${apiurl}${url}`, data, headers)
    .then(successCallBack)
    .catch(errorCallBack);
};

export const CallPostApiServicesToVerifyToken = (
  url,
  headers,
  successCallBack,
  errorCallBack
) => {
  axios
    .post(`${apiurl}${url}`, {}, headers)
    .then(successCallBack)
    .catch(errorCallBack);
};

export const CallPostApiServices = (
  url,
  data,
  successCallBack,
  errorCallBack
) => {
  axios
    .post(`${apiurl}${url}`, data)
    .then(successCallBack)
    .catch(errorCallBack);
};

export const CallPatchApiServicesWithTkn = (
  url,
  data,
  headers,
  successCallBack,
  errorCallBack
) => {
  axios
    .patch(`${apiurl}${url}`, data, headers)
    .then(successCallBack)
    .catch(errorCallBack);
};

export const CallDeleteApiServicesWithTkn = (
  url,
  headers,
  successCallBack,
  errorCallBack
) => {
  axios
    .delete(`${apiurl}${url}`, headers)
    .then(successCallBack)
    .catch(errorCallBack);
};

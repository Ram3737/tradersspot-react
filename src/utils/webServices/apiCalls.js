import { config } from "./config";
import axios from "axios";

const apiurl = config.apiurl;

export const CallGetApiServicesWithTkn = (
  url,
  data,
  successCallBack,
  errorCallBack
) => {
  console.log(`${apiurl}${url}`);
  axios.get(`${apiurl}${url}`, data).then(successCallBack).catch(errorCallBack);
};

export const CallPostApiServicesWithTkn = (
  url,
  data,
  headers,
  successCallBack,
  errorCallBack
) => {
  console.log(`${apiurl}${url}`);
  axios
    .post(`${apiurl}${url}`, data, headers)
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
  console.log(`${apiurl}${url}`);
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
  console.log(`${apiurl}${url}`);
  axios
    .delete(`${apiurl}${url}`, headers)
    .then(successCallBack)
    .catch(errorCallBack);
};
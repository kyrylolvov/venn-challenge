import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

const handleErrors = async (error: AxiosError) => {
  return Promise.reject(error);
};

const handleResponse = async (response: AxiosResponse) => {
  return response;
};

instance.interceptors.response.use(handleResponse, handleErrors);

export default instance;

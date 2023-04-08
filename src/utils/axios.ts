import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://3ab8a64d-d925-43d9-bdfd-c58872285667.mock.pstmn.io",
});

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Convert the response data to JSON format
    return response.data;
  },
  (error) => {
    // Handle any errors
    return Promise.reject(error);
  }
);

export default instance;
import { URLS } from "../constants";
import API from "../utils/API";

export const create = async (payload) => {
  try {
    return API.post(URLS.PRODUCTS, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const list = async () => {
  return API.get(`${URLS.PRODUCTS}`);
};
export const getProduct = async (id) => {
  return API.get(`${URLS.PRODUCTS}/${id}`);
};

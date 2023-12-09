import { URLS } from "../constants";
import API from "../utils/API";

export const login = async (payload) => {
  return API.post(URLS.AUTH + "/login", payload);
};

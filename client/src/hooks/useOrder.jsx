import { useState } from "react";
import API from "../utils/API";
import { URLS } from "../constants";

const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const list = async () => {
    try {
      setLoading(true);
      const resp = await API.get(URLS.ORDERS);
      return resp.data.data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const deleteById = async (id) => {
    try {
      setLoading(true);
      console.log(id)
      const resp = await API.delete(`${URLS.ORDERS}/${id}`);
      return resp.data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { list ,deleteById};
};

export default useOrder;

import { useState } from "react";
import API from "../utils/API";
import { URLS } from "../constants";

const useCategory = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const list = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(URLS.CATEGORIES);

      return data.data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const getById = async (id) => {
    try {
      setLoading(true);
      const { data } = await API.get(URLS.CATEGORIES+'/'+id);

      return data.data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const updateById = async (id,payload) => {
    try {
      setLoading(true);
      const result = await API.get(URLS.CATEGORIES+'/'+id,payload);

      return result;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const deleteById = async (id) => {
    try {
      setLoading(true);
      const result = await API.delete(`${URLS.CATEGORIES}/${id}`);
     
      return result;
      
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { list,getById,deleteById,updateById };
};

export default useCategory;

import { useState } from "react";
import API from "../utils/API";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
const useAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteById = async (url, id) => {
    try {
      setLoading(true);
      const { data } = await API.delete(`${url}/${id}`, {
        data: { isArchived: true },
      });
      if (data.msg === "success") {
        dispatch(fetchProducts());
      }
    } catch (e) {
      const errMsg = e?.response?.data?.msg || "something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, deleteById };
};
export default useAPI;

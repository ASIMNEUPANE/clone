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
  const getById = async (id) => {
    try {
      setLoading(true);
      const { data } = await API.get(`${URLS.ORDERS}/${id}`);
      return data.data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const updateById = async (id, payload) => {
    try {
      setLoading(true);
      const resp = await API.put(`${URLS.ORDERS}/${id}`, payload);
      return resp;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const create = async (payload) => {
    try {
      setLoading(true);
      const resp = await API.post(URLS.ORDERS, payload);
      return resp.data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const deleteById = async (id) => {
    try {
      setLoading(true);
      const resp = await API.delete(`${URLS.ORDERS}/${id}`);
      return resp.data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const approve = async (id, payload) => {
    try {
      setLoading(true);
      const resp = await API.patch(`${URLS.ORDERS}/status/${id}`, payload);
      return resp;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { list, getById, deleteById, create, updateById, approve };
};

export default useOrder;

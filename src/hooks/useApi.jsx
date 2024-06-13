// src/hooks/useApi.js
import { useState } from "react";
import axiosInstance from "../api/axiosConfig";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRequest = async (url, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(url, config);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  const postRequest = async (url, data, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(url, data, config);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  const patchRequest = async (url, data, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(url, data, config);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  const deleteRequest = async (url, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.delete(url, config);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  return {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
    loading,
    error,
  };
};

export default useApi;

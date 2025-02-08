import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (userData) => {
  return axios.post(`${API_URL}/api/auth/register`, userData);
};

export const login = async (data) => {
  return axios.post(`${API_URL}/api/auth/login`, data);
};

export const forgotPassword = async (email) => {
  return axios.post(`${API_URL}/api/auth/forgot-password`, { email });
};

export const resetPassword = async (data) => {
  return axios.post(`${API_URL}/api/auth/reset-password`, data);
};

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2555',
});

const getHeaders = () => {
  return {
    headers: {
      Authorization: `${localStorage.getItem("USER")}`,
    },
  };
};

export const GET = async <T>(url: string, params?: AxiosRequestConfig): Promise<T> => {
  try {
    const resp = await api.get<T>(url, { ...getHeaders(), ...params });
    return resp.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const POST = async <T>(url: string, body: unknown): Promise<T> => {
  try {
    const resp = await api.post<T>(url, body, {  ...getHeaders() });
    console.log(resp, resp.data);
    return resp.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const PUT = async <T>(url: string, body: unknown): Promise<T> => {
  try {
    const resp = await api.put<T>(url, body, getHeaders());
    console.log('PUT ERROR', resp.data);
    return resp.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const DELETE = async <T>(url: string): Promise<T> => {
  try {
    const resp = await api.delete<T>(url);
    console.log('DELETE ERROR', resp.data);
    return resp.data;
  } catch (error:AxiosError<unknown>) {
    handleError(error);
    throw error;
  }
};

const handleError = (error: AxiosError<unknown>) => {
  if (typeof error === 'string') {
    alert('String error', error);
  }
  if (error.response) {
    console.log('Status Code:', error.response.status);
    console.log('Response Data:', error.response.data);
    console.log('Response Headers:', error.response.headers);
    if (error.response.data && error.response.data.message) {
      alert('Error: ' + error.response.data.message);
    } else {
      alert('An error occurred. Please try again.');
    }
  } else if (error.request) {
    alert('No response received');
  } else {
    alert('error message', error.message);
  }
};
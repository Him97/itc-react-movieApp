import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ErrorResponse {
  status: number;
  data: {
    message?: string;
  };
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const getHeaders = (): AxiosRequestConfig => {
  return {
    headers: {
      'Authorization': `${localStorage.getItem('USER')}`,
    },
  };
};

export const GET = async (url: string, params = {}): Promise<any> => {
  try {
    const resp = await api.get(url, { ...getHeaders(), params });
    return resp;
  } catch (error) {
    handleError(error);
  }
};

export const POST = async (url: string, body: any): Promise<any> => {
  if (url === '/login') {
    try {
      const resp = await api.post(url, body, { withCredentials: true }, getHeaders());
      console.log(resp, resp.data);
      return resp.data;
    } catch (error) {
      handleError(error);
      console.error('Full Error Object:', error);
      console.log('Response Data:', error.response?.data);
    }
  } else {
    try {
      console.log(url, body);
      const resp = await api.post(url, body, getHeaders());
      console.log(url, body);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      handleError(error);
      console.error('Full Error Object:', error);
      console.log('Response Data:', error.response?.data);
    }
  }
};

export const PUT = async (url: string, body: any): Promise<any> => {
  console.log(body);
  try {
    const resp = await api.put(url, body, getHeaders());
    console.log('PUT ERROR', resp.data);
    return resp.data;
  } catch (error) {
    handleError(error);
  }
};

export const DELETE = async (url: string, body: any): Promise<any> => {
  console.log(body);
  try {
    const resp = await api.delete(url, { data: body });
    console.log('DELETE ERROR', resp.data);
    return resp.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: ErrorResponse | string): string => {
  if (typeof error === 'string') {
    return 'String error', error;
  }
  if (error.response) {
    console.log('Status Code:', error.response.status);
    console.log('Response Data:', error.response.data);
    console.log('Response Headers:', error.response.headers);
    if (error.response.data && error.response.data.message) {
      return 'Error: ' + error.response.data.message;
    } else {
      return 'An error occurred. Please try again.';
    }
  } else if (error.request) {
    return 'No response received';
  } else {
    return 'error message', error.message;
  }
};

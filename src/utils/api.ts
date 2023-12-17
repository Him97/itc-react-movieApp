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
    const response: AxiosResponse<T> = await api.get<T>(url, { ...getHeaders(), ...params });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const POST = async <T>(url: string, body: unknown): Promise<T> => {
  try {
    const response:AxiosResponse = await api.post<T>(url, body, {  ...getHeaders() });
    console.log(response, response.data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const PUT = async <T>(url: string, body: unknown): Promise<T> => {
  try {
    const response:AxiosResponse = await api.put<T>(url, body, getHeaders());
    console.log('PUT ERROR', response.data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const DELETE = async <T>(url: string): Promise<T> => {
  try {
    const response:AxiosResponse = await api.delete<T>(url);
    console.log('DELETE ERROR', response.data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

interface ApiError  {
  message?: string |unknown ;
  // other properties...
}

const handleError = (error: AxiosError) => {
  if (typeof error === 'string') {
    alert( error);
  }
  if (error.response) {
    console.log('Status Code:', error.response.status);
    console.log('Response Data:', error.response.data);
    console.log('Response Headers:', error.response.headers);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseData: ApiError|any = error.response.data;
    if (responseData && responseData.message) {
      alert('Error: ' + responseData.message);
    } else {
      alert('An error occurred. Please try again.');
    }
  } else if (error.request) {
    alert('No response received');
  } else {
    alert(error.message);
  }
};
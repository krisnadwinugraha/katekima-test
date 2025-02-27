import axios from 'axios';
import type { BerryListResponse, BerryDetail } from '../types/Berry';
import type { Product } from '../types/Product';

const BERRY_API_URL = 'https://pokeapi.co/api/v2/berry/';
const PRODUCT_API_URL = 'https://fakestoreapi.com/products';

// Berry API calls
export const getBerries = async (limit = 10, offset = 0): Promise<BerryListResponse> => {
  const response = await axios.get(`${BERRY_API_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getBerryById = async (id: number | string): Promise<BerryDetail> => {
  const response = await axios.get(`${BERRY_API_URL}${id}/`);
  return response.data;
};

// Product API calls
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(PRODUCT_API_URL);
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${PRODUCT_API_URL}/${id}`);
  return response.data;
};

export const addProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(PRODUCT_API_URL, product);
  return response.data;
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await axios.put(`${PRODUCT_API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<Product> => {
  const response = await axios.delete(`${PRODUCT_API_URL}/${id}`);
  return response.data;
};
import axios from 'axios';

export async function fetchPopularCategories() {
  return axios.get('/api/v1.0/categories/popular');
}

export async function fetchPopularAllCategories() {
  return axios.get('/api/v1.0/categories/all');
}

import apiClient from './axiosConfig';

export const productService = {
  // GET all products
  getAllProducts: async () => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  // GET single product by ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // POST create new product
  createProduct: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  // PUT update product
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  // DELETE product
  deleteProduct: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

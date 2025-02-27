import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../utils/api';
import type { Product } from '../types/Product';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const currentProduct = ref<Product | null>(null);
  const successMessage = ref<string | null>(null);

  // Actions
  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    try {
      products.value = await getProducts();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error fetching products';
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  }

  async function fetchProductById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      currentProduct.value = await getProductById(id);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error fetching product';
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  }

  async function createProduct(product: Product) {
    loading.value = true;
    error.value = null;
    successMessage.value = null;
    try {
      await addProduct(product);
      successMessage.value = 'Product added successfully!';
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error adding product';
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  }

  async function editProduct(id: number, product: Product) {
    loading.value = true;
    error.value = null;
    successMessage.value = null;
    try {
      await updateProduct(id, product);
      successMessage.value = 'Product updated successfully!';
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error updating product';
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  }

  async function removeProduct(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await deleteProduct(id);
      // Remove the product from the local array
      products.value = products.value.filter(p => p.id !== id);
      successMessage.value = 'Product deleted successfully!';
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error deleting product';
      console.error(error.value);
    } finally {
      loading.value = false;
    }
  }

  function clearCurrentProduct() {
    currentProduct.value = null;
  }

  function clearMessages() {
    successMessage.value = null;
    error.value = null;
  }

  return {
    products,
    loading,
    error,
    currentProduct,
    successMessage,
    fetchProducts,
    fetchProductById,
    createProduct,
    editProduct,
    removeProduct,
    clearCurrentProduct,
    clearMessages
  };
});
<!-- src/components/product/ProductForm.vue -->
<template>
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-6">{{ isEdit ? $t('product.form.editTitle') : $t('product.form.addTitle') }}</h2>
      
      <LoadingSkeleton v-if="loading" type="form" />
      
      <form v-else @submit.prevent="submitForm" class="space-y-6">
        <div v-if="productStore.successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {{ productStore.successMessage }}
        </div>
        
        <div v-if="productStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {{ $t('error', { message: productStore.error }) }}
        </div>
        
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">{{ $t('product.form.title') }}</label>
          <input 
            id="title" 
            v-model="form.title" 
            type="text" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <span v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</span>
        </div>
        
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">{{ $t('product.form.price') }}</label>
          <input 
            id="price" 
            v-model="form.price" 
            type="number" 
            step="0.01" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <span v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</span>
        </div>
        
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">{{ $t('product.form.description') }}</label>
          <textarea 
            id="description" 
            v-model="form.description" 
            rows="4" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
          <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
        </div>
        
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">{{ $t('product.form.category') }}</label>
          <input 
            id="category" 
            v-model="form.category" 
            type="text" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <span v-if="errors.category" class="text-red-500 text-sm">{{ errors.category }}</span>
        </div>
        
        <div>
          <label for="image" class="block text-sm font-medium text-gray-700">{{ $t('product.form.image') }}</label>
          <input 
            id="image" 
            v-model="form.image" 
            type="text" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
          <span v-if="errors.image" class="text-red-500 text-sm">{{ errors.image }}</span>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            @click="cancel" 
            class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ $t('product.form.cancel') }}
          </button>
          <button 
            type="submit" 
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ $t('product.form.submit') }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useProductStore } from '../../store/productStore';
  import type { Product } from '../../types/Product';
  import LoadingSkeleton from '../common/LoadingSkeleton.vue';
  
  const props = defineProps<{
    productId?: number;
    isEdit?: boolean;
  }>();
  
  const router = useRouter();
  const productStore = useProductStore();
  const loading = computed(() => productStore.loading);
  
  const form = reactive<Product>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  });
  
  const errors = reactive({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  
  // Validate form
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Reset errors
    Object.keys(errors).forEach(key => {
      errors[key as keyof typeof errors] = '';
    });
    
    if (!form.title || form.title.length < 3) {
      errors.title = form.title ? 
        'Title must be at least 3 characters' : 
        'Title is required';
      isValid = false;
    }
    
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
      errors.price = 'Please enter a valid price greater than 0';
      isValid = false;
    }
    
    if (!form.description || form.description.length < 10) {
      errors.description = form.description ? 
        'Description must be at least 10 characters' : 
        'Description is required';
      isValid = false;
    }
    
    if (!form.category) {
      errors.category = 'Category is required';
      isValid = false;
    }
    
    if (!form.image || !form.image.startsWith('http')) {
      errors.image = form.image ? 
        'Image URL must be valid (start with http)' : 
        'Image URL is required';
      isValid = false;
    }
    
    return isValid;
  };
  
  // Handle form submission
  const submitForm = async () => {
    if (!validateForm()) return;
    
    try {
      if (props.isEdit && props.productId) {
        await productStore.editProduct(props.productId, form);
      } else {
        await productStore.createProduct(form);
      }
      
      if (!productStore.error) {
        setTimeout(() => {
          router.push({ name: 'berries' });
        }, 2000); // Redirect after 2 seconds to show the success message
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };
  
  const cancel = () => {
    router.push({ name: 'berries' });
  };
  
  // Set form data if editing
  onMounted(async () => {
    productStore.clearMessages();
    
    if (props.isEdit && props.productId) {
      await productStore.fetchProductById(props.productId);
      
      if (productStore.currentProduct) {
        // Fill form with product data
        Object.assign(form, productStore.currentProduct);
      }
    }
  });
  
  // Clear form when switching between add/edit
  watch(
    () => props.isEdit,
    (newValue) => {
      if (!newValue) {
        // Reset form when switching to add mode
        Object.assign(form, {
          title: '',
          price: 0,
          description: '',
          category: '',
          image: ''
        });
      }
    }
  );
  </script>
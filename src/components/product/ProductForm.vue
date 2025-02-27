<!-- src/components/product/ProductForm.vue -->
<template>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
      {{ isEdit ? $t('product.form.editTitle') : $t('product.form.addTitle') }}
    </h2>
    
    <LoadingSkeleton v-if="loading" type="form" />
    
    <form v-else @submit.prevent="submitForm" class="space-y-8">
      <TransitionGroup name="fade">
        <div v-if="productStore.successMessage" key="success" class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ productStore.successMessage }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="productStore.error" key="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">{{ $t('error', { message: productStore.error }) }}</p>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Title Field -->
        <div class="col-span-2">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('product.form.title') }}</label>
          <input 
            id="title" 
            v-model="form.title" 
            type="text" 
            required 
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :class="{'border-red-500': errors.title}"
          >
          <TransitionGroup name="fade">
            <p v-if="errors.title" key="titleError" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          </TransitionGroup>
        </div>
        
        <!-- Price Field -->
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('product.form.price') }}</label>
          <input 
            id="price" 
            v-model="form.price" 
            type="number" 
            step="0.01" 
            required 
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :class="{'border-red-500': errors.price}"
          >
          <TransitionGroup name="fade">
            <p v-if="errors.price" key="priceError" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
          </TransitionGroup>
        </div>
        
        <!-- Category Field -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('product.form.category') }}</label>
          <input 
            id="category" 
            v-model="form.category" 
            type="text" 
            required 
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :class="{'border-red-500': errors.category}"
          >
          <TransitionGroup name="fade">
            <p v-if="errors.category" key="categoryError" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
          </TransitionGroup>
        </div>
        
        <!-- Description Field -->
        <div class="col-span-2">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('product.form.description') }}</label>
          <textarea 
            id="description" 
            v-model="form.description" 
            rows="4" 
            required 
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :class="{'border-red-500': errors.description}"
          ></textarea>
          <div class="flex justify-between mt-1">
            <TransitionGroup name="fade">
              <p v-if="errors.description" key="descError" class="text-sm text-red-600">{{ errors.description }}</p>
            </TransitionGroup>
            <span class="text-xs text-gray-500">{{ form.description.length }} / 500</span>
          </div>
        </div>
        
        <!-- Image URL Field -->
        <div class="col-span-2">
          <label for="image" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('product.form.image') }}</label>
          <input 
            id="image" 
            v-model="form.image" 
            type="text" 
            required 
            placeholder="https://example.com/image.jpg"
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            :class="{'border-red-500': errors.image}"
          >
          <TransitionGroup name="fade">
            <p v-if="errors.image" key="imageError" class="mt-1 text-sm text-red-600">{{ errors.image }}</p>
          </TransitionGroup>
        </div>
      </div>
      
      <div class="pt-5 border-t flex justify-end space-x-4">
        <button 
          type="button" 
          @click="cancel" 
          class="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {{ $t('product.form.cancel') }}
        </button>
        <button 
          type="submit" 
          class="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          :disabled="submitting"
        >
          <span v-if="submitting" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ $t('common.processing') }}
          </span>
          <span v-else>
            {{ isEdit ? $t('product.form.submit') : $t('product.form.submit') }}
          </span>
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
const submitting = ref(false);

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
  
  if (!form.title || form.title.trim().length < 3) {
    errors.title = form.title ? 
      'Title must be at least 3 characters' : 
      'Title is required';
    isValid = false;
  }
  
  if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) {
    errors.price = 'Please enter a valid price greater than 0';
    isValid = false;
  }
  
  if (!form.description || form.description.trim().length < 10) {
    errors.description = form.description ? 
      'Description must be at least 10 characters' : 
      'Description is required';
    isValid = false;
  } else if (form.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
    isValid = false;
  }
  
  if (!form.category || form.category.trim().length === 0) {
    errors.category = 'Category is required';
    isValid = false;
  }
  
  if (!form.image || !form.image.trim().match(/^https?:\/\/.+/i)) {
    errors.image = form.image ? 
      'Image URL must be valid (start with http:// or https://)' : 
      'Image URL is required';
    isValid = false;
  }
  
  return isValid;
};

// Handle form submission
const submitForm = async () => {
  if (!validateForm()) return;
  
  submitting.value = true;
  
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
  } finally {
    submitting.value = false;
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
      Object.assign(form, {
        title: productStore.currentProduct.title || '',
        price: productStore.currentProduct.price || 0,
        description: productStore.currentProduct.description || '',
        category: productStore.currentProduct.category || '',
        image: productStore.currentProduct.image || ''
      });
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
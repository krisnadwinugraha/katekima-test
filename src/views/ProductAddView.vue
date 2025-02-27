<!-- src/views/ProductAddView.vue -->
<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container mx-auto px-4">
      <div class="mb-6">
        <router-link :to="{ name: 'berries' }" class="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          {{ $t('detail.goBack') }}
        </router-link>
      </div>
      
      <ProductForm :is-edit="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductForm from '../components/product/ProductForm.vue';
</script>
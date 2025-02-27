<!-- src/views/ProductAddView.vue -->
<template>
    <div class="container mx-auto px-4 py-6">
      <div class="mb-4">
        <router-link :to="{ name: 'berries' }" class="text-indigo-600 hover:text-indigo-900">
          ← {{ $t('detail.goBack') }}
        </router-link>
      </div>
      
      <ProductForm :is-edit="false" />
    </div>
  </template>
  
  <script setup lang="ts">
  import ProductForm from '../components/product/ProductForm.vue';
  </script>
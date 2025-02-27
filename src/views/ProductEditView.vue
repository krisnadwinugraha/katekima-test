<!-- src/views/ProductEditView.vue -->
<template>
    <div class="container mx-auto px-4 py-6">
      <div class="mb-4">
        <router-link :to="{ name: 'berries' }" class="text-indigo-600 hover:text-indigo-900">
          ← {{ $t('detail.goBack') }}
        </router-link>
      </div>
      
      <ProductForm :is-edit="true" :product-id="Number(productId)" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import ProductForm from '../components/product/ProductForm.vue';
  
  const route = useRoute();
  const productId = computed(() => route.params.id);
  </script>
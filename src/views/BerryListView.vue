<!-- src/views/BerryListView.vue -->
<template>
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-6">{{ $t('navigation.berryList') }}</h1>
      <BerryTable />
    </div>
  </template>
  
  <script setup lang="ts">
  import BerryTable from '../components/berry/BerryTable.vue';
  </script>
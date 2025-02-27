<!-- src/views/BerryListView.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
        {{ $t('navigation.berryList') }}
      </h1>
      <div class="bg-white rounded-xl shadow-xl p-6">
        <BerryTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BerryTable from '../components/berry/BerryTable.vue';
</script>
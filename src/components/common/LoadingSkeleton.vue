<template>
    <div class="animate-pulse">
      <div v-if="type === 'table'" class="space-y-2">
        <div v-for="i in rows" :key="i" class="flex space-x-2">
          <div class="h-10 bg-gray-200 rounded w-12"></div>
          <div class="h-10 bg-gray-200 rounded w-64"></div>
          <div class="h-10 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
      
      <div v-else-if="type === 'detail'" class="space-y-3">
        <div class="h-6 bg-gray-200 rounded w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      <div v-else-if="type === 'form'" class="space-y-4">
        <div class="h-6 bg-gray-200 rounded w-1/4"></div>
        <div class="h-10 bg-gray-200 rounded w-full"></div>
        <div class="h-6 bg-gray-200 rounded w-1/4"></div>
        <div class="h-10 bg-gray-200 rounded w-full"></div>
        <div class="h-6 bg-gray-200 rounded w-1/4"></div>
        <div class="h-24 bg-gray-200 rounded w-full"></div>
        <div class="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    type: {
      type: String,
      default: 'table',
      validator: (value: string) => ['table', 'detail', 'form'].includes(value)
    },
    rows: {
      type: Number,
      default: 5
    }
  });
  </script>
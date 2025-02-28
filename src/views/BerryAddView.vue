<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-4">
      <router-link :to="{ name: 'berries' }" class="text-indigo-600 hover:text-indigo-900">
        ← {{ $t('common.goBack') }}
      </router-link>
    </div>
    
    <BerryForm :is-edit="false" />
  </div>
</template>

<script setup lang="ts">
import BerryForm from '../components/berry/BerryForm.vue';
</script>

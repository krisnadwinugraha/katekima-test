<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-4">
      <router-link :to="{ name: 'berries' }" class="text-indigo-600 hover:text-indigo-900">
        ← {{ $t('common.goBack') }}
      </router-link>
    </div>
    
    <BerryForm :is-edit="true" :berry-id="Number(berryId)" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BerryForm from '../components/berry/BerryForm.vue';

const route = useRoute();
const berryId = computed(() => route.params.id);
</script>

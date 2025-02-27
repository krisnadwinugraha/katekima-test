<!-- src/views/BerryDetailView.vue -->
<template>
    <div class="container mx-auto px-4 py-6">
      <div class="mb-4">
        <router-link :to="{ name: 'berries' }" class="text-indigo-600 hover:text-indigo-900">
          ← {{ $t('detail.goBack') }}
        </router-link>
      </div>
      
      <div class="mb-6 flex space-x-4 items-end">
        <div class="flex-1">
          <h1 class="text-2xl font-bold mb-2">{{ $t('detail.berryDetail') }}</h1>
          
          <div class="mb-4">
            <label for="berry-select" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('detail.select') }}
            </label>
            <div class="flex space-x-2 items-center">
              <select 
                id="berry-select" 
                v-model="selectedBerryId"
                class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option v-for="berry in berries" :key="berry.name" :value="getBerryId(berry.url)">
                  {{ berry.name }}
                </option>
              </select>
              <button 
                @click="navigateToBerry" 
                class="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {{ $t('detail.viewDetails') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <BerryDetail :berry-id="berryId" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useBerryStore } from '../store/berryStore';
  import BerryDetail from '../components/berry/BerryDetail.vue';
  
  const router = useRouter();
  const route = useRoute();
  const berryStore = useBerryStore();
  
  const berryId = computed(() => route.params.id);
  const selectedBerryId = ref(berryId.value);
  const berries = computed(() => berryStore.berries);
  
  // Navigate to the selected berry detail
  async function navigateToBerry() {
    if (selectedBerryId.value) {
      await router.push({ 
        name: 'berry-detail', 
        params: { id: selectedBerryId.value.toString() } 
      });
      // Force fetch the berry detail after navigation
      berryStore.fetchBerryDetail(Number(selectedBerryId.value));
    }
  }
  
  // Get berry ID from URL
  function getBerryId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }
  
  // Fetch all berries for the dropdown
  onMounted(async () => {
    // Use a larger limit to get more berries for the dropdown
    berryStore.setItemsPerPage(50);
    await berryStore.fetchBerries();
    selectedBerryId.value = berryId.value;
    
    // Reset to previous value after fetching
    berryStore.loadState();
  });
  
  // Update selected berry when route changes
  watch(berryId, (newId) => {
    if (newId) {
      selectedBerryId.value = newId;
      berryStore.fetchBerryDetail(Number(newId));
    }
  });
  </script>
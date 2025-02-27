<!-- src/components/berry/BerryTable.vue -->
<template>
    <div class="overflow-x-auto">
      <div class="mb-4 flex justify-between items-center">
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="handleSearch"
            :placeholder="$t('table.search')" 
            class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <router-link :to="{ name: 'product-add' }" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          {{ $t('table.addNew') }}
        </router-link>
      </div>
      
      <LoadingSkeleton v-if="loading" type="table" :rows="itemsPerPage" />
      
      <template v-else>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('table.no') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('table.name') }}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="displayedBerries.length === 0" class="text-center">
              <td colspan="3" class="px-6 py-4">{{ $t('noData') }}</td>
            </tr>
            <tr v-for="(berry, index) in displayedBerries" :key="berry.name">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ berry.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-2">
                  <router-link 
                    :to="{ name: 'berry-detail', params: { id: getBerryId(berry.url) }}" 
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    {{ $t('table.detail') }}
                  </router-link>
                  <button 
                    @click="handleEdit(getBerryId(berry.url))" 
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    {{ $t('table.edit') }}
                  </button>
                  <button 
                    @click="handleDelete(getBerryId(berry.url))" 
                    class="text-red-600 hover:text-red-900"
                  >
                    {{ $t('table.delete') }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <Pagination 
          :current-page="currentPage" 
          :total-pages="totalPages" 
          :items-per-page="itemsPerPage"
          :per-page-options="[10, 30, 50]" 
          @update:page="updatePage" 
          @update:items-per-page="updateItemsPerPage" 
        />
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useBerryStore } from '../../store/berryStore';
  import { useProductStore } from '../../store/productStore';
  import LoadingSkeleton from '../common/LoadingSkeleton.vue';
  import Pagination from '../common/Pagination.vue';
  
  const router = useRouter();
  const berryStore = useBerryStore();
  const productStore = useProductStore();
  
  const searchQuery = ref('');
  const currentPage = computed(() => berryStore.currentPage);
  const itemsPerPage = computed(() => berryStore.itemsPerPage);
  const totalPages = computed(() => berryStore.totalPages);
  const loading = computed(() => berryStore.loading);
  const displayedBerries = computed(() => berryStore.sortedBerries);
  
  // Extract berry ID from URL
  function getBerryId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }
  
  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    berryStore.updateSearchTerm(target.value);
  }
  
  function updatePage(page: number) {
    berryStore.setCurrentPage(page);
    berryStore.saveState();
  }
  
  function updateItemsPerPage(perPage: number) {
    berryStore.setItemsPerPage(perPage);
    berryStore.saveState();
  }
  
  function handleEdit(id: number) {
    alert(`Edit functionality would edit berry ${id}`);
    // For this example, we're redirecting to the product edit page
    router.push({ name: 'product-edit', params: { id } });
  }
  
  function handleDelete(id: number) {
    if (confirm(`Are you sure you want to delete berry ${id}?`)) {
      alert(`Delete functionality would delete berry ${id}`);
      // In a real app, you'd call the API to delete the item
    }
  }
  
  // Load data on component mount
  onMounted(async () => {
    berryStore.loadState();
    await berryStore.fetchBerries();
  });
  
  // Watch for changes and refetch data
  watch([currentPage, itemsPerPage], async () => {
    await berryStore.fetchBerries();
    berryStore.saveState();
  });
  </script>
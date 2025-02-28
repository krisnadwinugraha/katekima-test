<!-- src/components/berry/BerryTable.vue -->
<template>
  <div class="overflow-hidden rounded-xl bg-white shadow-lg">
    <div class="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div class="flex justify-between items-center">
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="handleSearch"
            :placeholder="$t('table.search')" 
            class="w-64 bg-white rounded-lg px-4 py-2 shadow-sm border-0 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>
        
        <router-link 
          :to="{ name: 'berry-add' }" 
          class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          {{ $t('table.addNew') }}
        </router-link>
      </div>
    </div>

    <LoadingSkeleton v-if="loading" type="table" :rows="itemsPerPage" />
    
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
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
        <tbody class="divide-y divide-gray-100">
          <tr v-if="!displayedBerries?.length" class="text-center">
            <td colspan="3" class="px-6 py-4">{{ $t('noData') }}</td>
          </tr>
          <tr v-for="(berry, index) in displayedBerries" 
              :key="berry?.name || index"
              class="hover:bg-gray-50 transition-colors duration-150">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ (currentPage - 1) * itemsPerPage + index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              {{ berry.name }}
            </td>
            <td class="px-6 py-4">
              <div class="flex space-x-3">
                <router-link 
                  :to="{ name: 'berry-detail', params: { id: getBerryId(berry.url) }}" 
                  class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md transition-all duration-200 hover:bg-indigo-100"
                >
                  {{ $t('table.detail') }}
                </router-link>
                <router-link 
                  :to="{ name: 'berry-edit', params: { id: getBerryId(berry.url) }}" 
                  class="text-yellow-600 hover:text-yellow-900 bg-yellow-50 px-3 py-1 rounded-md transition-all duration-200 hover:bg-yellow-100"
                >
                  {{ $t('table.edit') }}
                </router-link>
                <button 
                  @click="handleDelete(getBerryId(berry.url), berry.name)" 
                  class="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md transition-all duration-200 hover:bg-red-100"
                >
                  {{ $t('table.delete') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Add Pagination back -->
      <div class="border-t border-gray-200">
        <Pagination 
          :current-page="currentPage" 
          :total-pages="totalPages" 
          :items-per-page="itemsPerPage"
          :per-page-options="[10, 30, 50]" 
          @update:page="updatePage" 
          @update:items-per-page="updateItemsPerPage" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useBerryStore } from '../../store/berryStore';
// Remove productStore import as it's not needed
import LoadingSkeleton from '../common/LoadingSkeleton.vue';
import Pagination from '../common/Pagination.vue';
import Swal from 'sweetalert2';

const router = useRouter();
const berryStore = useBerryStore();
// Remove productStore constant

// Initialize searchQuery with store value
const searchQuery = ref(berryStore.searchTerm);
const currentPage = computed(() => berryStore.currentPage);
const itemsPerPage = computed(() => berryStore.itemsPerPage);
const totalPages = computed(() => berryStore.totalPages);
const loading = computed(() => berryStore.loading);
const displayedBerries = computed(() => berryStore.sortedBerries || []);

// Extract berry ID from URL
function getBerryId(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
}

function handleSearch() {
  berryStore.updateSearchTerm(searchQuery.value);
  // Save the state immediately to ensure the search term persists
  berryStore.saveState();
}

function updatePage(page: number) {
  berryStore.setCurrentPage(page);
  berryStore.saveState();
}

function updateItemsPerPage(perPage: number) {
  berryStore.setItemsPerPage(perPage);
  berryStore.saveState();
}

function handleEdit(id: number, name: string) {
  Swal.fire({
    title: 'Edit Berry',
    text: `You are about to edit ${name} (ID: ${id})`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Edit'
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: 'berry-edit', params: { id: id.toString() } });
    }
  });
}

function handleDelete(id: number, name: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete ${name} (ID: ${id})?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // Here you would typically call a delete method from berryStore
      // For now, we'll just show the success message
      Swal.fire({
        title: 'Deleted!',
        text: `Berry ${name} has been deleted.`,
        icon: 'success',
        confirmButtonColor: '#4f46e5'
      }).then(() => {
        // Optionally refresh the list after deletion
        berryStore.fetchBerries();
      });
    }
  });
}

// Make searchQuery bidirectional with store
watch(() => berryStore.searchTerm, (newValue) => {
  searchQuery.value = newValue;
});

// Watch searchQuery and update store
watch(searchQuery, (newValue) => {
  if (berryStore.searchTerm !== newValue) {
    berryStore.updateSearchTerm(newValue);
    berryStore.saveState();
  }
});

// Load data on component mount
onMounted(async () => {
  // Load saved state first
  berryStore.loadState();
  
  // Update local searchQuery from store after loading state
  searchQuery.value = berryStore.searchTerm;
  
  // Then fetch the berries
  await berryStore.fetchBerries();
});

// Watch for changes and refetch data
watch([currentPage, itemsPerPage], async () => {
  await berryStore.fetchBerries();
  berryStore.saveState();
});
</script>

<style scoped>
.table-row-enter-active,
.table-row-leave-active {
  transition: all 0.3s ease;
}
.table-row-enter-from,
.table-row-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
<!-- src/components/product/ProductTable.vue -->
<template>
  <div class="overflow-hidden rounded-xl bg-white shadow-lg">
    <div class="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="w-full sm:w-auto">
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="handleSearch"
            :placeholder="$t('table.search')" 
            class="w-full sm:w-64 bg-white rounded-lg px-4 py-2 shadow-sm border-0 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        </div>
        
        <router-link 
          :to="{ name: 'product-add' }" 
          class="w-full sm:w-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md"
        >
          {{ $t('table.addNew') }}
        </router-link>
      </div>
    </div>

    <LoadingSkeleton v-if="loading" type="table" :rows="itemsPerPage" />
    
    <div v-else>
      <!-- Improved responsive table container with clear horizontal scroll indication -->
      <div class="relative">
        <!-- Visible overflow indicator on small screens -->
        <div class="sm:hidden absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-l from-indigo-100 to-transparent w-8 h-16 pointer-events-none flex items-center justify-end pr-2 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <!-- Table with improved horizontal scrolling -->
        <div class="overflow-x-auto w-full" style="scrollbar-width: thin; scrollbar-color: #4f46e5 #eef2ff;">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap sticky left-0 bg-gray-50 z-10">
                  {{ $t('table.no') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {{ $t('product.form.title') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {{ $t('product.form.price') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {{ $t('product.form.category') }}
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {{ $t('table.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="!displayedProducts?.length" class="text-center">
                <td colspan="5" class="px-6 py-4">{{ $t('noData') }}</td>
              </tr>
              <tr v-for="(product, index) in displayedProducts" 
                  :key="product?.id || index"
                  class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img class="h-10 w-10 rounded-full object-cover" 
                           :src="product.image" 
                           :alt="product.title"
                           @error="handleImageError"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900 truncate max-w-xs">{{ product.title }}</div>
                      <div class="text-gray-500 text-sm truncate max-w-xs">{{ truncateDescription(product.description) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  ${{ product.price.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
                    {{ product.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex space-x-3">
                    <button 
                      @click="handleEdit(product.id, product.title)" 
                      class="text-yellow-600 hover:text-yellow-900 bg-yellow-50 px-3 py-1 rounded-md transition-all duration-200 hover:bg-yellow-100"
                    >
                      {{ $t('table.edit') }}
                    </button>
                    <button 
                      @click="handleDelete(product.id, product.title)" 
                      class="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md transition-all duration-200 hover:bg-red-100"
                    >
                      {{ $t('table.delete') }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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

    <!-- Small screen scroll hint -->
    <div class="sm:hidden text-center text-xs text-gray-500 py-2 italic">
      Swipe left/right to see more columns
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../../store/productStore';
import LoadingSkeleton from '../common/LoadingSkeleton.vue';
import Pagination from '../common/Pagination.vue';
import Swal from 'sweetalert2';

const router = useRouter();
const productStore = useProductStore();

// State
const searchQuery = ref('');
const filteredProducts = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Local Storage Keys
const STORAGE_KEY_PREFIX = 'product-table-';
const SEARCH_KEY = `${STORAGE_KEY_PREFIX}search`;
const PAGE_KEY = `${STORAGE_KEY_PREFIX}page`;
const ITEMS_PER_PAGE_KEY = `${STORAGE_KEY_PREFIX}items-per-page`;

// Save state to localStorage
function saveState() {
  localStorage.setItem(SEARCH_KEY, searchQuery.value);
  localStorage.setItem(PAGE_KEY, currentPage.value.toString());
  localStorage.setItem(ITEMS_PER_PAGE_KEY, itemsPerPage.value.toString());
}

// Load state from localStorage
function loadState() {
  const savedSearch = localStorage.getItem(SEARCH_KEY);
  const savedPage = localStorage.getItem(PAGE_KEY);
  const savedItemsPerPage = localStorage.getItem(ITEMS_PER_PAGE_KEY);
  
  if (savedSearch !== null) {
    searchQuery.value = savedSearch;
  }
  
  if (savedPage !== null) {
    currentPage.value = parseInt(savedPage);
  }
  
  if (savedItemsPerPage !== null) {
    itemsPerPage.value = parseInt(savedItemsPerPage);
  }
}

// Computed
const loading = computed(() => productStore.loading);
const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / itemsPerPage.value)
);
const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Methods
function handleSearch() {
  filterProducts();
  saveState();
}

function filterProducts() {
  if (!searchQuery.value.trim()) {
    filteredProducts.value = [...productStore.products];
  } else {
    const query = searchQuery.value.toLowerCase().trim();
    filteredProducts.value = productStore.products.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }
  
  // Reset to first page when filtering
  currentPage.value = 1;
  saveState();
}

function truncateDescription(description) {
  return description.length > 50 ? `${description.substring(0, 50)}...` : description;
}

function handleImageError(e) {
  // Set a placeholder image if the product image fails to load
  e.target.src = 'https://via.placeholder.com/40';
}

function updatePage(page) {
  currentPage.value = page;
  saveState();
}

function updateItemsPerPage(perPage) {
  itemsPerPage.value = perPage;
  currentPage.value = 1; // Reset to first page when changing items per page
  saveState();
}

function handleEdit(id: number, title: string) {
  Swal.fire({
    title: 'Edit Product',
    text: `You are about to edit ${title} (ID: ${id})`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Edit'
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: 'product-edit', params: { id } });
    }
  });
}

function handleDelete(id: number, title: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete ${title} (ID: ${id})?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleted!',
        text: `Product ${title} has been deleted.`,
        icon: 'success',
        confirmButtonColor: '#4f46e5'
      });
    }
  });
}

// Lifecycle hooks
onMounted(async () => {
  // Load saved state first
  loadState();
  
  // Then fetch products
  await productStore.fetchProducts();
  
  // Apply any saved filters
  filterProducts();
});

// Watch for changes in the products store
watch(() => productStore.products, () => {
  filterProducts();
}, { deep: true });

// Watch for changes to save state
watch([searchQuery, currentPage, itemsPerPage], () => {
  saveState();
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

/* Improved scrollbar styling for webkit browsers */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #eef2ff;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #4f46e5;
  border-radius: 3px;
}

/* Add horizontal scroll hint animation */
@keyframes bounce-x {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(3px); }
}

.animate-pulse {
  animation: bounce-x 1.5s infinite;
}
</style>
<template>
    <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          :disabled="currentPage === 1"
          @click="$emit('update:page', currentPage - 1)"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          {{ $t('pagination.prev') }}
        </button>
        <button
          :disabled="currentPage === totalPages"
          @click="$emit('update:page', currentPage + 1)"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        >
          {{ $t('pagination.next') }}
        </button>
      </div>
      
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            {{ $t('pagination.of', { total: totalPages }) }}
          </p>
        </div>
        
        <div class="flex items-center space-x-4">
          <div>
            <select
              v-model="perPage"
              @change="$emit('update:itemsPerPage', perPage)"
              class="rounded border-gray-300 py-1 px-2 text-sm text-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option v-for="n in perPageOptions" :key="n" :value="n">{{ n }}</option>
            </select>
            <span class="ml-1 text-sm text-gray-500">{{ $t('table.itemsPerPage') }}</span>
          </div>
          
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              :disabled="currentPage === 1"
              @click="$emit('update:page', currentPage - 1)"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            >
              <span class="sr-only">{{ $t('pagination.prev') }}</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <template v-for="page in displayedPages" :key="page">
              <span v-if="page === '...'" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <button
                v-else
                @click="$emit('update:page', page)"
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                :class="page === currentPage ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-gray-900 hover:bg-gray-50'"
              >
                {{ page }}
              </button>
            </template>
            
            <button
              :disabled="currentPage === totalPages"
              @click="$emit('update:page', currentPage + 1)"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            >
              <span class="sr-only">{{ $t('pagination.next') }}</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}>();

const emit = defineEmits(['update:page', 'update:itemsPerPage']);

const perPage = ref(props.itemsPerPage);
const perPageOptions = [10, 30, 50];

const displayedPages = computed(() => {
  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (props.totalPages <= maxVisible) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  pages.push(1);
  
  let startPage = Math.max(2, props.currentPage - 1);
  let endPage = Math.min(props.totalPages - 1, props.currentPage + 1);

  if (props.currentPage > 3) {
    pages.push('...');
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (props.currentPage < props.totalPages - 2) {
    pages.push('...');
  }

  pages.push(props.totalPages);

  return pages;
});
</script>
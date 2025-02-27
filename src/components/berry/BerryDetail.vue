<!-- src/components/berry/BerryDetail.vue -->
<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ $t('detail.berryDetail') }}</h3>
      </div>
      
      <LoadingSkeleton v-if="loading" type="detail" />
      
      <div v-else-if="berry" class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">{{ $t('detail.id') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ berry.id }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">{{ $t('detail.name') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ berry.name }}</dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">{{ $t('detail.growthTime') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ berry.growth_time }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">{{ $t('detail.maxHarvest') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ berry.max_harvest }}</dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">{{ $t('detail.size') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ berry.size }}</dd>
          </div>
          <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">{{ $t('detail.firmness') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ berry.firmness.name }}</dd>
          </div>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">{{ $t('detail.flavors') }}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li v-for="(flavor, index) in berry.flavors" :key="index" class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div class="w-0 flex-1 flex items-center">
                    <span class="ml-2 flex-1 w-0 truncate">{{ flavor.flavor.name }}: {{ flavor.potency }}</span>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      
      <div v-else class="border-t border-gray-200 px-4 py-5">
        {{ $t('noData') }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, watch, onMounted } from 'vue';
  import { useBerryStore } from '../../store/berryStore';
  import LoadingSkeleton from '../common/LoadingSkeleton.vue';
  
  const props = defineProps<{
    berryId: number | string;
  }>();
  
  const berryStore = useBerryStore();
  const berry = computed(() => berryStore.currentBerry);
  const loading = computed(() => berryStore.loadingDetail);
  
  // Function to fetch berry data
  const fetchBerryData = () => {
    if (props.berryId) {
      berryStore.fetchBerryDetail(Number(props.berryId));
    }
  };
  
  // Watch for berryId changes
  watch(() => props.berryId, (newId) => {
    if (newId) {
      fetchBerryData();
    }
  }, { immediate: true });
  
  // Clean up when component unmounts
  onMounted(() => {
    return () => {
      berryStore.clearCurrentBerry();
    };
  });
  </script>
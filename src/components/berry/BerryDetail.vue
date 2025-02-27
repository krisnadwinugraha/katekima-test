<!-- src/components/berry/BerryDetail.vue -->
<template>
  <div class="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
      <h3 class="text-xl font-bold text-white">{{ $t('detail.berryDetail') }}</h3>
    </div>
    
    <LoadingSkeleton v-if="loading" type="detail" />
    
    <div v-else-if="berry" class="divide-y divide-gray-100">
      <dl>
        <div v-for="(item, index) in detailItems" :key="index"
          class="px-6 py-4 transition-colors duration-200 hover:bg-gray-50"
          :class="{ 'bg-gray-50': index % 2 === 0 }">
          <dt class="text-sm font-medium text-gray-500">{{ item.label }}</dt>
          <dd class="mt-1 text-lg text-gray-900">{{ item.value }}</dd>
        </div>
        
        <!-- Flavors section -->
        <div class="px-6 py-4">
          <dt class="text-sm font-medium text-gray-500 mb-3">{{ $t('detail.flavors') }}</dt>
          <dd class="grid grid-cols-2 gap-3">
            <div v-for="flavor in berry.flavors" :key="flavor.flavor.name"
              class="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg">
              <div class="font-medium text-indigo-700">{{ flavor.flavor.name }}</div>
              <div class="text-sm text-gray-600">Potency: {{ flavor.potency }}</div>
            </div>
          </dd>
        </div>
      </dl>
    </div>
    
    <div v-else class="p-6 text-center text-gray-500">
      {{ $t('noData') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBerryStore } from '../../store/berryStore';
import LoadingSkeleton from '../common/LoadingSkeleton.vue';

const { t } = useI18n();

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

// Computed property for detail items
const detailItems = computed(() => {
  if (!berry.value) return [];
  return [
    { label: t('detail.id'), value: berry.value.id },
    { label: t('detail.name'), value: berry.value.name },
    { label: t('detail.growthTime'), value: berry.value.growth_time },
    { label: t('detail.maxHarvest'), value: berry.value.max_harvest },
    { label: t('detail.size'), value: berry.value.size },
    { label: t('detail.firmness'), value: berry.value.firmness.name },
  ];
});
</script>

<style scoped>
.detail-enter-active,
.detail-leave-active {
  transition: all 0.3s ease;
}
.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
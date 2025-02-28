<template>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
      {{ isEdit ? $t('berry.form.editTitle') : $t('berry.form.addTitle') }}
    </h2>
    
    <LoadingSkeleton v-if="loading" type="form" />
    
    <form v-else @submit.prevent="submitForm" class="space-y-8">
      <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Name Field -->
        <div class="col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('berry.form.name') }}</label>
          <input 
            id="name" 
            v-model="form.name" 
            type="text" 
            required 
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
        
        <!-- Growth Time Field -->
        <div>
          <label for="growth_time" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('berry.form.growthTime') }}</label>
          <input 
            id="growth_time" 
            v-model="form.growth_time" 
            type="number" 
            required 
            min="0"
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
        
        <!-- Max Harvest Field -->
        <div>
          <label for="max_harvest" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('berry.form.maxHarvest') }}</label>
          <input 
            id="max_harvest" 
            v-model="form.max_harvest" 
            type="number" 
            required 
            min="0"
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <!-- Size Field -->
        <div>
          <label for="size" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('berry.form.size') }}</label>
          <input 
            id="size" 
            v-model="form.size" 
            type="number" 
            required 
            min="0"
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>

        <!-- Smoothness Field -->
        <div>
          <label for="smoothness" class="block text-sm font-medium text-gray-700 mb-1">{{ $t('berry.form.smoothness') }}</label>
          <input 
            id="smoothness" 
            v-model="form.smoothness" 
            type="number" 
            required 
            min="0"
            class="w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
      </div>
      
      <div class="pt-5 border-t flex justify-end space-x-4">
        <button 
          type="button" 
          @click="cancel" 
          class="py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {{ $t('common.cancel') }}
        </button>
        <button 
          type="submit" 
          class="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          :disabled="submitting"
        >
          {{ submitting ? $t('common.processing') : (isEdit ? $t('common.update') : $t('common.create')) }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBerryStore } from '../../store/berryStore';
import LoadingSkeleton from '../common/LoadingSkeleton.vue';
import type { BerryDetail } from '../../types/Berry';

const props = defineProps<{
  berryId?: number;
  isEdit?: boolean;
}>();

const router = useRouter();
const berryStore = useBerryStore();
const loading = ref(false);
const submitting = ref(false);
const successMessage = ref('');

const form = reactive<Partial<BerryDetail>>({
  name: '',
  growth_time: 0,
  max_harvest: 0,
  size: 0,
  smoothness: 0
});

const submitForm = async () => {
  submitting.value = true;
  try {
    if (props.isEdit && props.berryId) {
      await berryStore.updateBerry(props.berryId, form);
      successMessage.value = 'Berry updated successfully!';
    } else {
      await berryStore.addBerry(form);
      successMessage.value = 'Berry created successfully!';
    }
    // Wait 2 seconds before redirecting
    setTimeout(() => {
      router.push({ name: 'berries' });
    }, 2000);
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    submitting.value = false;
  }
};

const cancel = () => {
  router.push({ name: 'berries' });
};

onMounted(async () => {
  if (props.isEdit && props.berryId) {
    loading.value = true;
    try {
      await berryStore.fetchBerryDetail(props.berryId);
      if (berryStore.currentBerry) {
        Object.assign(form, {
          name: berryStore.currentBerry.name,
          growth_time: berryStore.currentBerry.growth_time,
          max_harvest: berryStore.currentBerry.max_harvest,
          size: berryStore.currentBerry.size,
          smoothness: berryStore.currentBerry.smoothness
        });
      }
    } finally {
      loading.value = false;
    }
  }
});
</script>

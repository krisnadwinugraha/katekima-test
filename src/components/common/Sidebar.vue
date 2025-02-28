<template>
  <div class="w-64 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white shadow-xl flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
    <!-- Logo area -->
    <div class="p-6">
      <div class="bg-white/10 backdrop-blur-sm rounded-lg py-4 text-center border border-white/10 shadow-inner">
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Logo</span>
      </div>
    </div>
  
    <!-- Module selection dropdown -->
    <div class="px-6 pb-4">
      <div 
        class="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between cursor-pointer border border-white/10 hover:bg-white/15 transition-colors duration-200"
        @click="toggleModuleDropdown"
      >
        <span class="text-white font-medium">{{ $t('sidebar.moduleSelect') }}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 transition-transform duration-200" 
          :class="{'rotate-180': moduleDropdownOpen}"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
  
      <!-- Dropdown content -->
      <div 
        v-if="moduleDropdownOpen" 
        class="mt-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 shadow-lg overflow-hidden"
      >
        <div class="p-3 text-sm hover:bg-white/10 cursor-pointer transition-colors duration-150 border-b border-white/5">{{ $t('sidebar.module1') }}</div>
        <div class="p-3 text-sm hover:bg-white/10 cursor-pointer transition-colors duration-150 border-b border-white/5">{{ $t('sidebar.module2') }}</div>
        <div class="p-3 text-sm hover:bg-white/10 cursor-pointer transition-colors duration-150">{{ $t('sidebar.module3') }}</div>
      </div>
    </div>
  
    <!-- Menu items (Navigation Links) -->
    <div class="py-4 px-3 flex-1 space-y-1">
      <router-link 
        v-for="(menuItem, index) in localizedMenuItems" 
        :key="index" 
        :to="menuItem.route"
        class="block px-3 py-3 text-sm rounded-lg cursor-pointer transition-all duration-200 flex items-center"
        :class="{ 
          'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md font-medium': isActive(menuItem.route),
          'hover:bg-white/10': !isActive(menuItem.route)
        }"
      >
        <span v-if="isActive(menuItem.route)" class="w-1.5 h-6 bg-white rounded-full mr-3"></span>
        <span v-else class="w-1.5 h-6 opacity-0 mr-3"></span>
        {{ menuItem.name }}
      </router-link>
    </div>

    <!-- Bottom section -->
    <div class="p-6 border-t border-white/10 mt-auto">
      <div class="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
        <div class="text-xs text-white/60">{{ $t('sidebar.appVersion') }}</div>
        <div class="text-sm font-medium">v1.0.0</div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
  
// Get i18n composition API
const { t } = useI18n();

// Dropdown state
const moduleDropdownOpen = ref(false);
  
// Navigation menu items with localization
const localizedMenuItems = computed(() => [
  { name: t('navigation.berryList'), route: { name: 'berries' } },
  { name: t('navigation.addProduct'), route: { name: 'products' } }
]);
  
// Get current route for active state
const route = useRoute();
const isActive = (targetRoute: any) => route.name === targetRoute.name;
  
// Toggle dropdown function
function toggleModuleDropdown() {
  moduleDropdownOpen.value = !moduleDropdownOpen.value;
}
</script>
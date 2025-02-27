<template>
  <div class="flex h-16 bg-white shadow-sm border-b border-gray-100 items-center justify-between px-6">
    <!-- Left side - Menu button -->
    <button class="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Right side - Language and user -->
    <div class="flex items-center space-x-4 relative">
      <!-- Custom Language Selector -->
      <div class="relative">
        <div 
          class="flex items-center cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          <img 
            :src="flagData[currentLang].img" 
            :alt="flagData[currentLang].alt" 
            class="w-6 h-4 mr-2 border border-white/20 rounded-sm"
          />
          <span class="mr-1 font-medium">{{ flagData[currentLang].label }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{'rotate-180': isDropdownOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Dropdown List -->
        <div v-if="isDropdownOpen" class="absolute top-12 left-0 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
          <ul>
            <li 
              v-for="(data, lang) in flagData" 
              :key="lang" 
              @click="selectLanguage(lang)"
              class="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
              :class="{'bg-indigo-50': lang === currentLang}"
            >
              <img :src="data.img" :alt="data.alt" class="w-6 h-4 mr-3 border border-gray-200 rounded-sm" />
              <span class="font-medium" :class="{'text-indigo-600': lang === currentLang}">{{ data.label }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- User profile -->
      <div class="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200 px-3 py-1.5 rounded-lg cursor-pointer">
        <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
          <span class="font-medium">U</span>
        </div>
        <span class="ml-2 font-medium text-gray-700">Username</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import indonesiaFlag from '../../assets/indonesia-flag.png';
import americaFlag from '../../assets/america-flag.jpg';

// Vue I18n instance
const { locale } = useI18n();

// Reactive reference for language state
const currentLang = ref(locale.value || 'en');
const isDropdownOpen = ref(false);

const flagData = ref({
  en: {
    img: americaFlag,
    alt: 'USA flag',
    label: 'English',
  },
  id: {
    img: indonesiaFlag,
    alt: 'Indonesia flag',
    label: 'Indonesia',
  },
});

// Function to change language
const selectLanguage = (lang: string) => {
  currentLang.value = lang;
  locale.value = lang;
  localStorage.setItem('locale', lang);
  isDropdownOpen.value = false; // Close dropdown after selection
};

// Load saved language preference
onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    locale.value = savedLocale;
    currentLang.value = savedLocale;
  }
});
</script>
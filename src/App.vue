<!-- src/App.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <div class="flex flex-1">
      <!-- Sidebar -->
      <Sidebar />
      
      <!-- Main content area -->
      <div class="flex-1 flex flex-col ml-64">
        <!-- Navbar -->
        <Navbar />
        
        <!-- Main content -->
        <main class="flex-1 p-6 bg-gray-50">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
        
        <!-- Footer -->
        <footer class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="flex items-center space-x-4 mb-4 md:mb-0">
                <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span class="text-white font-bold">YL</span>
                </div>
                <h3 class="text-white font-bold text-lg">Logo</h3>
              </div>
              <div class="flex flex-wrap justify-center gap-6">
                <a href="#" class="text-white/90 hover:text-white transition-colors">Home</a>
                <a href="#" class="text-white/90 hover:text-white transition-colors">About</a>
                <a href="#" class="text-white/90 hover:text-white transition-colors">Services</a>
                <a href="#" class="text-white/90 hover:text-white transition-colors">Contact</a>
              </div>
              <div class="mt-4 md:mt-0">
                <div class="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center">
                  <span class="text-white text-sm">© 2025 Krisna</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/common/Navbar.vue';
import Sidebar from './components/common/Sidebar.vue';
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9fafb;
  overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
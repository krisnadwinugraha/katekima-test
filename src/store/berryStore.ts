import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getBerries, getBerryById } from '../utils/api';
import type { BerryListItem, BerryDetail } from '../types/Berry';

export const useBerryStore = defineStore('berry', {
  state: () => ({
    berries: [] as BerryListItem[],
    currentBerry: null as BerryDetail | null,
    loadingList: false,
    loadingDetail: false,
    totalItems: 0,
    itemsPerPage: 20,
    currentPage: 1,
    error: null as string | null,
    searchTerm: ''
  }),

  getters: {
    filteredBerries: (state) => {
      if (!state.searchTerm) return state.berries;
      return state.berries.filter(berry => 
        berry.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },

    sortedBerries: (state, getters) => {
      return [...getters.filteredBerries].sort((a, b) => a.name.localeCompare(b.name));
    },

    totalPages: (state) => Math.ceil(state.totalItems / state.itemsPerPage),
    
    offset: (state) => (state.currentPage - 1) * state.itemsPerPage
  },

  actions: {
    async fetchBerries() {
      this.loadingList = true;
      this.error = null;
      try {
        const response = await getBerries(this.itemsPerPage, this.offset);
        this.berries = response.results;
        this.totalItems = response.count;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error fetching berries';
        console.error(this.error);
      } finally {
        this.loadingList = false;
      }
    },

    async fetchBerryDetail(id: number) {
      try {
        this.loadingDetail = true;
        this.currentBerry = null; // Reset current berry before fetching
        const response = await fetch(`https://pokeapi.co/api/v2/berry/${id}`);
        if (!response.ok) throw new Error('Failed to fetch berry detail');
        this.currentBerry = await response.json();
      } catch (error) {
        console.error('Error fetching berry detail:', error);
      } finally {
        this.loadingDetail = false;
      }
    },

    clearCurrentBerry() {
      this.currentBerry = null;
    },

    updateSearchTerm(term: string) {
      this.searchTerm = term;
      this.currentPage = 1; // Reset to first page when searching
    },

    setItemsPerPage(items: number) {
      this.itemsPerPage = items;
      this.currentPage = 1; // Reset to first page when changing items per page
    },

    setCurrentPage(page: number) {
      this.currentPage = page;
    },

    // Persist state to localStorage
    saveState() {
      localStorage.setItem('berryStore', JSON.stringify({
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
        searchTerm: this.searchTerm
      }));
    },

    loadState() {
      const savedState = localStorage.getItem('berryStore');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.currentPage = state.currentPage || 1;
        this.itemsPerPage = state.itemsPerPage || 10;
        this.searchTerm = state.searchTerm || '';
      }
    }
  }
});
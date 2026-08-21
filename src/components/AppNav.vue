<template>
  <div class="app-nav p-3 d-flex justify-content-between align-items-center" 
  :class="isDark ? 'bg-dark text-white' : 'bg-light text-dark border-bottom'">
    <div class="mx-auto d-flex gap-2">
            <button 
        @click="goToTab('search')"
        class="btn"
        :class="activeTab === 'search' ? (isDark ? 'btn-light' : 'btn-dark') : (isDark ? 'btn-outline-light' : 'btn-outline-dark')">
          {{ t('search') }}
      </button>

      <button 
        @click="goToTab('favorites')"
        class="btn"
        :class="activeTab === 'favorites' ? (isDark ? 'btn-light' : 'btn-dark') : (isDark ? 'btn-outline-light' : 'btn-outline-dark')">
          {{ t('favorites') }}
      </button>

      <button
        @click="goToTab('collections')"
        class="btn"
        :class="activeTab === 'collections' ? (isDark ? 'btn-light' : 'btn-dark') : (isDark ? 'btn-outline-light' : 'btn-outline-dark')">
          {{ t('collections') }}
      </button>
    </div>
    <div class="position-relative">
      <button 
        @click.stop="toggleMenu"
        class="btn" 
        :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">
          ⚙️
      </button>

      <div v-if="showMenu" ref="menuRef" class="dropdown-menu show mt-2 end-0">
        <button 
          class="dropdown-item" 
          @click="$router.push('/about')">
            {{ t('aboutProject') }}
        </button>
        
        <button 
          class="dropdown-item" 
          @click="toggleTheme">
            {{ isDark ? t('lightTheme') : t('darkTheme') }}
        </button>
        
        <button 
          class="dropdown-item" 
          @click="toggleLocale">
            {{ currentLocale === 'ru' ? 'EN' : 'RU' }}
        </button>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useLocale } from '../composables/useLocale'
import { useTabs } from '../composables/useTabs'

const router = useRouter()
const { t, currentLocale, setLocale } = useLocale()
const { activeTab, setActiveTab } = useTabs()
const { isDark, toggleTheme } = useTheme()
const showMenu = ref(false)
const menuRef = ref(null)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const goToTab = (tab) => {
  setActiveTab(tab)
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

const toggleLocale = () => {
  setLocale(currentLocale.value === 'ru' ? 'en' : 'ru')
}

const handleOutsideClick = (event) => {
  const menu = menuRef.value
  if (menu && !menu.contains(event.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>
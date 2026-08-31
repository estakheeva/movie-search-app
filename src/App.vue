<template>
  <div class="d-flex flex-column min-vh-100">
    <AppNav :isDark="isDark" />
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" class="flex-grow-1" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
import AppNav from './components/AppNav.vue'
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
</script>
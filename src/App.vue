<template>
  <div class="d-flex flex-column min-vh-100">
    <AppNav :isDark="isDark" />
    <router-view class="flex-grow-1" />
  </div>
</template>

<script setup>
import AppNav from './components/AppNav.vue'
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
</script>
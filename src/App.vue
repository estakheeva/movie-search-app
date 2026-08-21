<template>
  <AppNav :isDark="isDark" />
  <router-view />
</template>

<script setup>
import AppNav from './components/AppNav.vue'
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
</script>
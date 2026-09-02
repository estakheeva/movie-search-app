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
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppNav from './components/AppNav.vue'
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()
const route = useRoute()

watch(
  () => route.meta.title,
  (newTitle) => {
    document.title = newTitle ?  `${newTitle} | Movie Search` : 'Movie Search'
  },
  {immediate: true}
)

</script>
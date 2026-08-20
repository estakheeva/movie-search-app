<template>
  <div :class="isDark ? 'bg-dark text-white' : 'bg-light text-dark'" class="min-vh-100 p-4">
    <div class="app-container">
      <button @click="$router.back()" class="btn mb-4" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">
        {{ t('back') }}
      </button>

      <h1 class="mb-3">{{ t('aboutTitle') }}</h1>

      <p class="lead">
        {{ t('aboutLead') }}
      </p>

      <h4 class="mt-4">{{ t('whatItCan') }}</h4>
      <ul>
        <li>Поиск фильмов через API Кинопоиска</li>
        <li>Пагинация (кнопка «Показать ещё»)</li>
        <li>Страница с деталями фильма</li>
        <li>Избранное с сохранением в localStorage</li>
        <li>Переключение тёмной и светлой темы</li>
      </ul>

      <h4 class="mt-4">{{ t('technologies') }}</h4>
      <ul>
        <li>Vue 3 (Composition API)</li>
        <li>Vue Router</li>
        <li>JavaScript (ES6+)</li>
        <li>Bootstrap 5</li>
        <li>REST API</li>
        <li>Git и GitHub</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLocale } from '../composables/useLocale'

const isDark = ref(JSON.parse(localStorage.getItem('isDark') ?? 'true'))
const { t } = useLocale()
</script>
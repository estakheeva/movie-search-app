<template>
  <div class="app-container bg-dark text-white min-vh-100 p-4">
    <h1 class="text-center mb-4">Поиск фильмов</h1>
    <div class="d-flex gap-2 mb-4">
      <input v-model="query" class="form-control" placeholder="Введите название фильма" />
      <button @click="searchMovies" class="btn btn-primary">Искать</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')

const searchMovies = () => {
  console.log('Ищем фильм:', query.value)
  // Здесь позже будет запрос к API
}
</script>


<style>
body {
  margin: 0;
}
</style>

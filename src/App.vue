<template>
  <div class="app-container bg-dark text-white min-vh-100 p-4">
    <h1 class="text-center mb-4">Поиск фильмов</h1>
    <div class="d-flex gap-2 mb-4">
      <input v-model="query" class="form-control" placeholder="Введите название фильма" />
      <button @click="searchMovies" class="btn btn-primary">Искать</button>
    </div>
  </div>

  <div v-if="error" class="alert alert-warning">{{ error }}</div>
    <div v-if="movies.length" class="row">
      <div v-for="film in movies" :key="film.imdbID" class="col-md-4 mb-3">
        <div class="card bg-secondary text-white h-100">
          <img 
            :src="film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'" 
            class="card-img-top" 
            :alt="film.Title" 
            @error="e => e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster'"/>
           <div class="card-body">
              <h5 class="card-title">{{ film.Title }}</h5>
              <p class="card-text">{{ film.Year }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const movies = ref([])
const error = ref('')
const apiKey = '2f24d494'

const searchMovies = async () => {
  error.value = ''
  movies.value = []
  
  if (!query.value.trim()) return
  
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query.value}`)
    const data = await response.json()
    
    if (data.Response === 'True') {
      movies.value = data.Search
    } else {
      error.value = data.Error || 'Ничего не найдено'
    }
  } catch (e) {
    error.value = 'Ошибка при загрузке данных'
  }
}
</script>


<style>
body {
  margin: 0;
}
</style>

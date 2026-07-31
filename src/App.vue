<template>
  <div class="bg-dark text-white min-vh-100 p-4">
    <div class="app-container">
      <h1 class="text-center mb-4">Поиск фильмов</h1>
      <div class="d-flex gap-2 mb-4">
        <input v-model="query" class="form-control" placeholder="Введите название фильма" />
        <button @click="searchMovies" class="btn btn-primary">Искать</button>
        <button @click="clearAll" class="btn btn-outline-light">Стереть</button>
      </div>
    </div>

    <div v-if="error" class="text-center py-5">
      <div class="mb-3" style="font-size: 48px;">🎬</div>
      <h4 class="text-warning">{{ error }}</h4>
      <p class="text-warning">Попробуйте изменить запрос или проверить название фильма</p>
    </div>
    
    <div v-if="movies.length" class="row">
      <div v-for="film in movies" :key="film.filmId" class="col-sm-4 col-lg-3 col-xl-2 mb-3">
        <div class="card bg-secondary text-white h-100">
          <img
            :src="film.posterUrlPreview || 'https://via.placeholder.com/300x450?text=No+Poster'"
            class="card-img-top"
            :alt="film.nameRu || film.nameEn"
            @error="e => e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster'"
          />
          <div class="card-body">
            <h5 class="card-title">{{ film.nameRu || film.nameEn }}</h5>
            <p class="card-text">{{ film.year }}</p>
          </div>
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
const apiKey = '335a516b-35b5-4740-b827-f1443f969811'

const searchMovies = async () => {
  error.value = ''
  movies.value = []
  
  if (!query.value.trim()) return
  
  try {
    const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${query.value}`, {
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    
    if (data.films && data.films.length > 0) {
      movies.value = data.films
    } else {
      error.value = 'Ничего не найдено'
    }
  } catch (e) {
    error.value = 'Ошибка при загрузке данных'
    console.error(e)
  }
}

const clearAll = () => {
  query.value = ''
  movies.value = []
  error.value = ''
}
</script>


<style>
body {
  margin: 0;
}
</style>

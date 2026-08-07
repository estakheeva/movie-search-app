<template>
  <div class="bg-dark text-white min-vh-100 p-4">
    <SearchBar
      :loading="loading"
      :error="error"
      @search="onSearch"
      @clear="onClear"
    />

    <div v-if="movies.length" class="row">
      <div v-for="film in movies" :key="film.filmId" class="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
        <div class="card bg-secondary text-white h-100">
          <img
            v-if="film.posterUrlPreview && !film.posterUrlPreview.includes('no-poster')"
            :src="film.posterUrlPreview"
            class="card-img-top"
            :alt="film.nameRu || film.nameEn"
          />
          <div v-else class="card-img-top d-flex align-items-center justify-content-center bg-dark text-light" style="height: 200px;">
            <span>Нет постера</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ film.nameRu || film.nameEn }}</h5>
            <p class="card-text">{{ film.year }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="movies.length" class="text-center mt-4">
      <button @click="loadMore" class="btn btn-outline-light">Показать ещё</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'

const movies = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(1)
const currentQuery = ref('')
const apiKey = '335a516b-35b5-4740-b827-f1443f969811'

const fetchMovies = async (query, pageNum) => {
  const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${query}&page=${pageNum}`, {
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}

const onSearch = async (query) => {
  error.value = ''
  movies.value = []
  page.value = 1
  currentQuery.value = query

  if (!query.trim()) return

  loading.value = true
  try {
    const data = await fetchMovies(query, 1)
    if (data.films && data.films.length > 0) {
      movies.value = data.films
    } else {
      error.value = 'Ничего не найдено'
    }
  } catch (e) {
    error.value = 'Ошибка при загрузке данных'
  } finally {
    loading.value = false
  }
}

const loadMore = async () => {
  page.value++
  loading.value = true
  try {
    const data = await fetchMovies(currentQuery.value, page.value)
    if (data.films && data.films.length > 0) {
      movies.value = [...movies.value, ...data.films]
    }
  } catch (e) {
    error.value = 'Ошибка при загрузке'
  } finally {
    loading.value = false
  }
}

const onClear = () => {
  movies.value = []
  error.value = ''
  page.value = 1
  currentQuery.value = ''
}
</script>

<style>
body {
  margin: 0;
}
</style>
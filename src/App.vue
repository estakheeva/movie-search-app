<template>
  <div class="bg-dark text-white min-vh-100 p-4">
    <SearchBar
      :loading="loading"
      :error="error"
      @search="onSearch"
      @clear="onClear"
    />

    <MovieGrid :movies="movies" />

    <div v-if="movies.length" class="text-center mt-4">
      <button @click="loadMore" class="btn btn-outline-light">Показать ещё</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import MovieGrid from './components/MovieGrid.vue'

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
<template>
  <div class="bg-dark text-white min-vh-100 p-4">
    <div class="d-flex justify-content-center mb-4">
      <button
        @click="activeTab = 'search'"
        class="btn me-2"
        :class="activeTab === 'search' ? 'btn-primary' : 'btn-outline-light'"
      >
        Поиск
      </button>
      <button
        @click="activeTab = 'favorites'"
        class="btn"
        :class="activeTab === 'favorites' ? 'btn-primary' : 'btn-outline-light'"
      >
        Избранное
      </button>
    </div>

    <div v-if="activeTab === 'search'">
      <SearchBar
        :loading="loading"
        :error="error"
        @search="onSearch"
        @clear="onClear"
      />

      <MovieGrid :movies="movies" :favorites="favorites" @filmClick="goToFilm" @toggleFavorite="toggleFavorite" />

      <div v-if="movies.length" class="text-center mt-4">
        <button @click="loadMore" class="btn btn-outline-light">Показать ещё</button>
      </div>
    </div>

    <div v-if="activeTab === 'favorites'">
      <FavoritesGrid :favorites="favorites" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import MovieGrid from '../components/MovieGrid.vue'
import FavoritesGrid from '../components/FavoritesGrid.vue'
import { useRouter } from 'vue-router'


const movies = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(1)
const currentQuery = ref('')
const router = useRouter()
const apiKey = '335a516b-35b5-4740-b827-f1443f969811'
const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))
const activeTab = ref('search')

const toggleFavorite = (film) => {
  const isFavorite = favorites.value.some(fav => fav.filmId === film.filmId)
  if (isFavorite) {
    favorites.value = favorites.value.filter(fav => fav.filmId !== film.filmId)
  } else {
    favorites.value.push(film)
  }
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

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

const goToFilm = (id) => {
  router.push(`/movie/${id}`)
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
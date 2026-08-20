<template>
  <div :class="isDark ? 'bg-dark text-white' : 'bg-light text-dark'" class="min-vh-100 p-4">
    <div class="d-flex justify-content-center gap-2 mb-4">
      <button @click="toggleTheme" class="btn" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">
          {{ isDark ? 'Светлая тема' : 'Тёмная тема' }}
      </button>
      <button @click="$router.push('/about')" class="btn" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">
          О проекте
      </button>
      <button 
        @click="setLocale(currentLocale === 'ru' ? 'en' : 'ru')" 
        class="btn" 
        :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">
          {{ currentLocale === 'ru' ? 'EN' : 'RU' }}
      </button>
    </div>

    <div class="d-flex justify-content-center mb-4">
      <button
        @click="setActiveTab('search')"
        class="btn me-2"
        :class="[
          activeTab === 'search' ? 'btn-primary' : '',
          isDark ? 'text-white' : 'text-dark border'
        ]"
      >
        Поиск
      </button>
      <button
        @click="setActiveTab('favorites')"
        class="btn"
        :class="[
          activeTab === 'favorites' ? 'btn-primary' : '',
          isDark ? 'text-white' : 'text-dark border'
        ]"
      >
        Избранное
      </button>
    </div>

    <div v-if="activeTab === 'search'">
      <SearchBar
        :loading="loading"
        :error="error"
        :isDark="isDark"
        @search="onSearch"
        @clear="onClear"
      />

      <MovieGrid
        :movies="movies"
        :favorites="favorites"
        @filmClick="goToFilm"
        @toggleFavorite="toggleFavorite"
        :isDark="isDark"
      />

      <div v-if="movies.length" class="text-center mt-4">
        <button @click="loadMore" class="btn" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">Показать ещё</button>
      </div>
    </div>

    <div v-if="activeTab === 'favorites'">
      <FavoritesGrid
        :favorites="favorites"
        @toggleFavorite="toggleFavorite"
        :isDark="isDark"
        @filmClick="goToFilm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import SearchBar from '../components/SearchBar.vue'
import MovieGrid from '../components/MovieGrid.vue'
import FavoritesGrid from '../components/FavoritesGrid.vue'

const router = useRouter()
const movies = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(1)
const currentQuery = ref('')
const apiKey = '335a516b-35b5-4740-b827-f1443f969811'
const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))
const isDark = ref(JSON.parse(localStorage.getItem('isDark') ?? 'true'))
const activeTab = ref('search')
const savedTab = sessionStorage.getItem('lastTab')
const { currentLocale, setLocale } = useLocale()

if (savedTab) {
  activeTab.value = savedTab
  sessionStorage.removeItem('lastTab')
}

const saveSearchState = (films, query) => {
  sessionStorage.setItem('lastMovies', JSON.stringify(films))
  sessionStorage.setItem('lastQuery', query)
}

const restoreSearchState = () => {
  const savedMovies = sessionStorage.getItem('lastMovies')
  const savedQuery = sessionStorage.getItem('lastQuery')

  if (savedMovies) movies.value = JSON.parse(savedMovies)
  if (savedQuery) currentQuery.value = savedQuery

  sessionStorage.removeItem('lastMovies')
  sessionStorage.removeItem('lastQuery')
}

const clearSearchState = () => {
  sessionStorage.removeItem('lastMovies')
  sessionStorage.removeItem('lastQuery')
}

restoreSearchState()

const setActiveTab = (tab) => {
  activeTab.value = tab
  sessionStorage.setItem('lastTab', tab)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('isDark', JSON.stringify(isDark.value))
}

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
      saveSearchState(data.films, query)
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
      saveSearchState(movies.value, currentQuery.value)
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
  clearSearchState()
}

const goToFilm = (id) => {
  router.push(`/movie/${id}`)
}
</script>

<style>
body {
  margin: 0;
}
</style>
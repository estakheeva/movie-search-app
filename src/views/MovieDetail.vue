<template>
  <div :class="isDark ? 'bg-dark text-white' : 'bg-light text-dark'" class="p-4">
    
    <button @click="$router.back()" class="btn mb-4" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">{{ t('back') }}</button>
    
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-warning"></div>
      <p class="text-warning mt-2">{{ t('loading') }}</p>
  </div>
    
    <div v-if="film" class="row">
      <div class="col-md-4 mb-3">
        <img
          v-if="film.posterUrl && !film.posterUrl.includes('no-poster')"
          :src="film.posterUrl"
          class="img-fluid rounded"
        />
        <div v-else class="bg-secondary d-flex align-items-center justify-content-center rounded" style="height: 400px;">
          <span class="text-light">{{ t('noPoster') }}</span>
        </div>
      </div>
      
      <div class="col-md-8">
        <h2>{{ film.nameRu || film.nameEn }}</h2>
        <p class="text-muted">{{ film.year }} • {{ film.genres?.map(g => g.genre).join(', ') }}</p>
        <p v-if="film.description" class="mt-3">{{ film.description }}</p>
        <p v-if="film.rating" class="mt-2"><strong>Рейтинг:</strong> {{ film.rating }}</p>
        <p v-if="film.filmLength" class="mt-2"><strong>Длительность:</strong> {{ film.filmLength }} мин.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const film = ref(null)
const loading = ref(true)
const apiKey = '335a516b-35b5-4740-b827-f1443f969811'

const { isDark } = useTheme()
const { t } = useLocale()

onMounted(async () => {
  try {
    const res = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${route.params.id}`, {
      headers: { 'X-API-KEY': apiKey }
    })
    film.value = await res.json()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>
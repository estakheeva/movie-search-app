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
        <p v-if="film.rating" class="mt-2"><strong>{{ t('rating') }}:</strong> {{ film.rating }}</p>
        <p v-if="film.filmLength" class="mt-2"><strong>{{ t('duration') }}:</strong> {{ film.filmLength }} мин.</p>
        
        <div class="mt-4">
        
          <button class="btn" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'" @click="showCollections = !showCollections">
            {{ t('addToCollection') }}
          </button>

          <div v-if="showCollections" class="mt-2">
            <div v-if="collections.length">
              <button
                v-for="collection in collections"
                :key="collection.id"
                class="btn w-100 text-start"
                :class="isDark ? 'text-white bg-dark' : 'text-dark bg-white'"
                @click="addToCollection(collection.id)"
              >
                {{ collection.name }}
              </button>
            </div>
            <div v-else class="text-muted">
              {{ t('noCollections') }}
            </div>
          </div>

          <p v-if="message" class="mt-2">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'
import { useCollections } from '../composables/useCollections'

const route = useRoute()
const film = ref(null)
const loading = ref(true)
const apiKey = '335a516b-35b5-4740-b827-f1443f969811'

const { isDark } = useTheme()
const { t } = useLocale()
const { collections, addMovieToCollection } = useCollections()
const showCollections = ref(false)
const message = ref('')

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

const addToCollection = (collectionId) => {
  if (!film.value) return
  const result = addMovieToCollection(collectionId, film.value)

  if (result.success) {
    message.value = t('savedToCollection')
    showCollections.value = false
    setTimeout(()=>{
      message.value = ''
    },3000)
  } else if (result.message === 'alreadyExists') {
    message.value = `${t('alreadyInCollection')}: ${result.collectionName}`
    showCollections.value = false
    setTimeout(()=>{
      message.value = ''
    },3000)
  }
}
</script>
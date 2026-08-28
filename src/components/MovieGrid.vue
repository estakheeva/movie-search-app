<template>
  <div v-if="movies.length" class="row">
    <div v-for="film in movies" :key="film.filmId" class="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
      <div class="card bg-secondary text-white h-100" style="position: relative;">
        <button
          @click.stop="$emit('toggleFavorite', film)"
          class="btn btn-sm position-absolute top-0 end-0 m-2"
          :class="favorites.some(fav => fav.filmId === film.filmId) ? 'text-warning' : 'text-white'"
          style="font-size: 1.5rem; background: transparent; border: none;"
        >
          {{ favorites.some(fav => fav.filmId === film.filmId) ? '★' : '☆' }}
        </button>
        <div @click="$emit('filmClick', film.filmId)" style="cursor: pointer;">
          <img
            v-if="film.posterUrlPreview && !film.posterUrlPreview.includes('no-poster')"
            :src="film.posterUrlPreview"
            class="card-img-top"
            :alt="film.nameRu || film.nameEn"
          />
          <div v-else class="card-img-top d-flex align-items-center justify-content-center bg-dark text-light" style="height: 200px;">
            <span>{{ t('noPoster') }}</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ film.nameRu || film.nameEn }}</h5>
            <p class="card-text">{{ film.year || t('yearNotSpecified') }}</p>
          </div>
          <button
            @click.stop="toggleCollectionMenu(film)"
            class="btn btn-sm position-absolute bottom-0 end-0 m-2 text-white"
            style="background: transparent; border: none; font-size: 2rem; font-weight: bold; line-height: 1;"
            title="Добавить в подборку"
          >
            +
          </button>
          
          <div v-if="menuFilm && menuFilm.filmId === film.filmId" class="position-absolute bottom-0 start-0 end-0 p-2 bg-dark" style="z-index: 10;">
            <div v-if="collections.length">
              <button
                v-for="collection in collections"
                :key="collection.id"
                class="btn btn-sm w-100 text-start text-white"
                @click.stop="addToCollection(collection.id)"
              >
                {{ collection.name }}
              </button>
            </div>
            <div v-else class="text-white small text-center">
              {{ t('noCollections') }}
            </div>
            <button 
              class="btn btn-sm w-100 text-start text-white"
              @click.stop="openCreateForm"
              >
                {{ t('createCollection') }}
              </button>
              <div v-if="showCreateForm" class="mt-2" @click.stop>
                <input 
                  v-model="newCollectionName"
                  class="form-control form-control-sm mb-2"
                  :placeholder="t('collectionName')" 
                />
                <button class="btn btn-sm btn-light text-dark me-2" @click.stop="saveNewCollection">
                  {{ t('save') }}
                </button>
                <button class="btn btn-sm btn-outline-light" @click.stop="CancelCreateForm">
                  {{ t('cancel') }}
                </button>
              </div>
          </div>
          <p 
            v-if="message && menuFilm && menuFilm.filmId === film.filmId" 
            class="text-warning small p-2 bg-dark position-absolute top-50 start-50 translate-middle"
            style="z-index: 20; white-space: nowrap;">{{ message }}
          </p>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCollections } from '../composables/useCollections'
import { useTabs } from '../composables/useTabs'
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
const { collections, addMovieToCollection, addCollection } = useCollections()
const { setActiveTab } = useTabs()
const router = useRouter()
const menuFilm = ref(null)
const message = ref('')
const showCreateForm = ref(false)
const newCollectionName = ref('')

const toggleCollectionMenu = (film) => {
  message.value = ''
  menuFilm.value = menuFilm.value?.filmId === film.filmId ? null : film
}

const openCreateForm = () => {
  showCreateForm.value = true
}

const CancelCreateForm = () => {
  showCreateForm.value = false
  newCollectionName.value = ''
}

const saveNewCollection = () => {
  const name = newCollectionName.value.trim()
  if(!name) return

  addCollection(name, '')
  showCreateForm.value = false
  newCollectionName.value = ''
  message.value = `${t('canAddToCollection')} "${name}"`
}

const addToCollection = (collectionId) => {
  if (!menuFilm.value) return
  const result = addMovieToCollection(collectionId, menuFilm.value)

  if (result.success) {
    menuFilm.value = null
  } else if (result.message === 'alreadyExists') {
    message.value = `${t('alreadyInCollection')}: ${result.collectionName} `
    setTimeout(() => {
      message.value = ''
      menuFilm.value = null
    }, 2000)
  }
}

// eslint-disable-next-line no-undef
defineProps({
  movies: Array,
  favorites: Array
})

// eslint-disable-next-line no-undef
defineEmits(['filmClick', 'toggleFavorite'])
</script>
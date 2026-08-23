<template>
  <div>
    <div class="d-flex justify-content-center align-items-center mb-4">
      <!--  <h2>{{ t('collections') }}</h2>-->
      <button class="btn" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'" @click="showForm = !showForm">
        {{ t('createCollection') }}
      </button>
    </div>

    <div v-if="showForm" class="mb-4 row justify-content-center">
      <div class="col-12 col-md-6">
        <input v-model="newName" class="form-control mb-2" :placeholder="t('collectionName')" />
        <textarea v-model="newDescription" class="form-control mb-2" :placeholder="t('collectionDescription')"></textarea>
        <button class="btn btn-primary me-2" @click="saveCollection">{{ t('save') }}</button>
        <button class="btn" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'" @click="showForm = false">{{ t('cancel') }}</button>
      </div>
    </div>

    <div v-if="selectedCollection">
      
      <button class="btn mb-3" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'" @click="selectedCollectionId = null">
        ← {{ t('backToCollections') }}
      </button>
      <button class="btn mb-3 ms-3" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'" @click="openEditForm">{{ t('editCollection') }}</button>
      
      <h3>{{ selectedCollection.name }}</h3>
      <p v-if="selectedCollection.description"  :class="isDark ? 'text-light' : 'text-muted'">{{ selectedCollection.description }}</p>
      
      <div v-if="isEditing" class="mt-3 mb-3">
        <input v-model="editName" class="form-control mb-2" :placeholder="t('collectionName')" />
        <textarea v-model="editDescription" class="form-control mb-2" :placeholder="t('collectionDescription')"></textarea>
        <button class="btn btn-primary me-2" @click="saveEdit"> {{ t('save') }}</button>
        <button class="btn btn-primary me-2" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'" @click="cancelEdit"> {{ t('cancel') }}</button>
      </div>
      
      <div v-if="selectedCollection.movies.length" class="row mt-3">
        <div v-for="movie in selectedCollection.movies" :key="movie.kinopoiskId" class="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
          <div class="card h-100 position-relative" :class="isDark ? 'bg-secondary text-white' : 'bg-white text-dark border'">
            <img
              v-if="movie.posterUrlPreview && !movie.posterUrlPreview.includes('no-poster')"
              :src="movie.posterUrlPreview"
              class="card-img-top"
              :alt="movie.nameRu || movie.nameEn"
            />
            <div v-else class="card-img-top d-flex align-items-center justify-content-center" :class="isDark ? 'bg-dark text-light' : 'bg-light text-dark'" style="height: 200px;">
              <span>{{ t('noPoster') }}</span>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ movie.nameRu || movie.nameEn }}</h5>
              <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" @click="removeMovie(movie.kinopoiskId)">
                ✕
              </button>
              <p class="card-text">{{ movie.year || t('yearNotSpecified') }}</p>
            </div>
          </div>
        </div>
      </div>

      <p v-else class="mt-3">{{ t('collectionEmpty') }}</p>
      <button class="btn btn-danger mt-3" @click="removeCollection">
        {{ t('deleteCollection') }}
      </button>
    </div>

    <div v-else>
      <div v-if="collections.length">
        <div
          v-for="collection in collections"
          :key="collection.id"
          class="card mb-2"
          :class="isDark ? 'bg-secondary text-white' : 'bg-white text-dark border'"
          style="cursor: pointer;"
          @click="selectedCollectionId = collection.id"
        >
          <div class="card-body">
            <h5 class="card-title">{{ collection.name }}</h5>
            <p class="card-text" v-if="collection.description">{{ collection.description }}</p>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <p :class="isDark ? 'text-white' : 'text-dark'">{{ t('noCollections') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useCollections } from '../composables/useCollections'

const { t } = useLocale()
const { collections, addCollection, deleteCollection, updateCollection, removeMovieFromCollection } = useCollections()

const showForm = ref(false)
const newName = ref('')
const newDescription = ref('')
const selectedCollectionId = ref(null)
const isEditing = ref(false)
const editName = ref('')
const editDescription = ref('')

const saveCollection = () => {
  if (!newName.value.trim()) return

addCollection(newName.value.trim(), newDescription.value.trim())
  newName.value = ''
  newDescription.value = ''
  showForm.value = false
}

const selectedCollection = computed(() => {
  return collections.value.find(c => c.id === selectedCollectionId.value) || null
})

const openEditForm = () => {
  if(!selectedCollection.value) return
  editName.value = selectedCollection.value.name
  editDescription.value = selectedCollection.value.description || ''
  isEditing.value = true
}

const saveEdit = () => {
  if(!selectedCollection.value || !editName.value.trim()) return
  updateCollection(selectedCollection.value.id, editName.value.trim(), editDescription.value.trim())
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing = false
}

const removeMovie = (movieId) => {
  if(!selectedCollection.value) return
  removeMovieFromCollection(selectedCollection.value.id, movieId)
}

const removeCollection = () => {
  if (selectedCollection.value) {
    deleteCollection(selectedCollection.value.id)
    selectedCollectionId.value = null
  }
}

defineProps({
  isDark: Boolean
})
</script>
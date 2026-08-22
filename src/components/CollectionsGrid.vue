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
      <h3>{{ selectedCollection.name }}</h3>
      <p v-if="selectedCollection.description" class="text-muted">{{ selectedCollection.description }}</p>
      <p v-if="!selectedCollection.movies.length" class="mt-3">{{ t('collectionEmpty') }}</p>
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
const { collections, addCollection, deleteCollection } = useCollections()

const showForm = ref(false)
const newName = ref('')
const newDescription = ref('')
const selectedCollectionId = ref(null)

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
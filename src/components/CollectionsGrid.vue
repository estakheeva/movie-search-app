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

    <div v-if="collections.length">
      <div v-for="collection in collections" :key="collection.id" class="card mb-2" :class="isDark ? 'bg-secondary text-white' : 'bg-white text-dark border'">
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
</template>

<script setup>
import { ref } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useCollections } from '../composables/useCollections'

const { t } = useLocale()
const { collections, addCollection } = useCollections()

const showForm = ref(false)
const newName = ref('')
const newDescription = ref('')

const saveCollection = () => {
  if (!newName.value.trim()) return

  addCollection(newName.value.trim(), newDescription.value.trim())
  newName.value = ''
  newDescription.value = ''
  showForm.value = false
}

defineProps({
  isDark: Boolean
})
</script>
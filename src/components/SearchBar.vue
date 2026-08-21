<template>
  <div>
    <h1 class="text-center mb-4">{{ t('searchMovies') }}</h1>

    <div class="row g-2 mb-4 justify-content-center">
      <div class="col-12 col-md-6">
        <input v-model="query" @keyup.enter="$emit('search', query)" class="form-control" :placeholder="t('enterMovieTitle')" />
      </div>
      <div class="col-6 col-md-auto">
        <button @click="$emit('search', query)" class="btn btn-primary w-100">{{ t('searchButton') }}</button>
      </div>
      <div class="col-6 col-md-auto">
        <button @click="clear" class="btn w-100" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">{{ t('clearButton') }}</button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="text-warning mt-2">{{ t('loading') }}</p>
    </div>

    <div v-if="error" class="text-center py-5">
      <div class="mb-3" style="font-size: 48px;">🎬</div>
      <h4 class="text-warning">{{ error }}</h4>
      <p class="text-warning">{{ t('tryAnotherQuery') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()

// eslint-disable-next-line no-undef
const props = defineProps({
  loading: Boolean,
  error: String,
  isDark: Boolean,
  initialQuery: String
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['search', 'clear'])

const query = ref(props.initialQuery || '')

const clear = () => {
  query.value = ''
  emit('clear')
}
</script>
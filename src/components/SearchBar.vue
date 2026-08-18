<template>
  <div>
    <h1 class="text-center mb-4">Поиск фильмов</h1>

    <div class="row g-2 mb-4 justify-content-center">
      <div class="col-12 col-md-6">
        <input v-model="query" @keyup.enter="$emit('search', query)" class="form-control" placeholder="Введите название фильма" />
      </div>
      <div class="col-6 col-md-auto">
        <button @click="$emit('search', query)" class="btn btn-primary w-100">Искать</button>
      </div>
      <div class="col-6 col-md-auto">
        <button @click="clear" class="btn w-100" :class="isDark ? 'btn-outline-light' : 'btn-outline-dark'">Стереть</button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="text-warning mt-2">Ищем фильмы...</p>
    </div>

    <div v-if="error" class="text-center py-5">
      <div class="mb-3" style="font-size: 48px;">🎬</div>
      <h4 class="text-warning">{{ error }}</h4>
      <p class="text-warning">Попробуйте изменить запрос или проверить название фильма</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line no-undef
defineProps({
  loading: Boolean,
  error: String,
  isDark: Boolean
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['search', 'clear'])

const query = ref('')

const clear = () => {
  query.value = ''
  emit('clear')
}
</script>
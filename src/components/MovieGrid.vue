<template>
  <div v-if="movies.length" class="row">
    <div v-for="film in movies" :key="film.filmId" class="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
      <div class="card bg-secondary text-white h-100" @click="$emit('filmClick', film.filmId)" style="cursor: pointer;">
        <img
          v-if="film.posterUrlPreview && !film.posterUrlPreview.includes('no-poster')"
          :src="film.posterUrlPreview"
          class="card-img-top"
          :alt="film.nameRu || film.nameEn"
        />
        <div v-else class="card-img-top d-flex align-items-center justify-content-center bg-dark text-light" style="height: 200px;">
          <span>Нет постера</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ film.nameRu || film.nameEn }}</h5>
          <p class="card-text">{{ film.year }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  movies: Array
})

// eslint-disable-next-line no-undef
defineEmits(['filmClick'])
</script>
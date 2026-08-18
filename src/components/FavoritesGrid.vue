<template>
  <div v-if="favorites.length" class="row">
    <div v-for="film in favorites" :key="film.filmId" class="col-6 col-sm-4 col-lg-3 col-xl-2 mb-3">
      <div class="card h-100" :class="isDark ? 'bg-secondary text-white' : 'bg-white text-dark border'" style="position: relative;">
        <button
          @click.stop="$emit('toggleFavorite', film)"
          class="btn btn-sm position-absolute top-0 end-0 m-2"
          :class="isDark ? 'btn-dark' : 'btn-light border'"
        >
          ★
        </button>
        <img
          v-if="film.posterUrlPreview && !film.posterUrlPreview.includes('no-poster')"
          :src="film.posterUrlPreview"
          class="card-img-top"
          :alt="film.nameRu || film.nameEn"
        />
        <div v-else class="card-img-top d-flex align-items-center justify-content-center" :class="isDark ? 'bg-dark text-light' : 'bg-light text-dark'" style="height: 200px;">
          <span>Нет постера</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ film.nameRu || film.nameEn }}</h5>
          <p class="card-text">{{ film.year }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-5">
    <h4 :class="isDark ? 'text-warning' : 'text-muted'">В избранном пока пусто</h4>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  favorites: Array,
  isDark: Boolean
})

// eslint-disable-next-line no-undef
defineEmits(['toggleFavorite'])
</script>
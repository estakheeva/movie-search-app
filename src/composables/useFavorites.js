import { ref } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

export const useFavorites = () => {

  const isFavorite = (filmId) => {
    return favorites.value.some(fav => {
      const favId = fav.filmId || fav.kinopoiskId
      return favId === filmId
    })
  }

  const toggleFavorite = (film) => {
    const id = film.filmId || film.kinopoiskId

    if (isFavorite(id)) {
      favorites.value = favorites.value.filter(fav => {
        const favId = fav.filmId || fav.kinopoiskId
        return favId !== id
      })
    } else {
      favorites.value.push(film)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite
  }
}
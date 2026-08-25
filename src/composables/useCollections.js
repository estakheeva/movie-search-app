import { ref } from 'vue'

const collections = ref(JSON.parse(localStorage.getItem('collections') || '[]'))

export const useCollections = () => {
  const saveCollections = () => {
    localStorage.setItem('collections', JSON.stringify(collections.value))
  }

  const addCollection = (name, description) => {
    const newCollection = {
      id: Date.now(),
      name,
      description,
      movies: []
    }
    collections.value.push(newCollection)
    saveCollections()
    return newCollection
  }

  const addMovieToCollection = (collectionId, movie) => {
    const collection = collections.value.find(c => c.id === collectionId)
    if (!collection) return { success: false, message: 'notFound' }

    const exists = collection.movies.some(m => {
      if (movie.filmId && m.filmId && Number(m.filmId) === Number(movie.filmId)) return true
      if (movie.kinopoiskId && m.kinopoiskId && Number(m.kinopoiskId) === Number(movie.kinopoiskId)) return true

      const movieName = (movie.nameRu || movie.nameEn || '').toLowerCase()
      const mName = (m.nameRu || m.nameEn || '').toLowerCase()
      const movieYear = movie.year ? String(movie.year) : ''
      const mYear = m.year ? String(m.year) : ''

      return movieName && movieName === mName && movieYear && movieYear === mYear
    })

    if (exists) return { 
      success: false, 
      message: 'alreadyExists',
      collectionName: collection.name
    }

    collection.movies.push(movie)
    saveCollections()
    return { success: true }
  }

  const updateCollection = (collectionId, name, description) => {
    const collection = collections.value.find(c => c.id === collectionId)
    if (!collection) return

    collection.name = name
    collection.description = description
    saveCollections()
  }

  const removeMovieFromCollection = (collectionId, movieId) => {
    const collection = collections.value.find(c => c.id === collectionId)
    if (!collection) return

    collection.movies = collection.movies.filter(m => m.kinopoiskId !== movieId)
    saveCollections()
  }

  const deleteCollection = (collectionId) => {
    collections.value = collections.value.filter(c => c.id !== collectionId)
    saveCollections()
  }

  return {
    collections,
    addCollection,
    addMovieToCollection,
    updateCollection,
    removeMovieFromCollection,
    deleteCollection
  }
}
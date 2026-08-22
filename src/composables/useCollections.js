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

    const exists = collection.movies.some(m => m.kinopoiskId === movie.kinopoiskId)
    if (exists) return { success: false, message: 'alreadyExists' }

    collection.movies.push(movie)
    saveCollections()
    return { success: true }
  }

  const deleteCollection = (collectionId) => {
    collections.value = collections.value.filter(c => c.id !== collectionId)
    saveCollections()
}

  return {
    collections,
    addCollection,
    addMovieToCollection,
    deleteCollection
  }
}
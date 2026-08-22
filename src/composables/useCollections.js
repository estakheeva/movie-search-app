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

  return {
    collections,
    addCollection
  }
}
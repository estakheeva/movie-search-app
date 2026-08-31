import { ref } from 'vue'

const activeTab = ref('search')

export const useTabs = () => {
  const setActiveTab = (tab) => {
    activeTab.value = tab
  }

  return {
    activeTab,
    setActiveTab
  }
}
import { ref } from 'vue'

const activeTab = ref(sessionStorage.getItem('activeTab') || 'search')

export const useTabs = () => {
  const setActiveTab = (tab) => {
    activeTab.value = tab
    sessionStorage.setItem('activeTab', tab)
  }

  return {
    activeTab,
    setActiveTab
  }
}
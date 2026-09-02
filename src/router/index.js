import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetail from '../views/MovieDetail.vue'
import About from '../views/About.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: Home,
    meta: { title: 'Search'}
  },
  { 
    path: '/movie/:id', 
    name: 'MovieDetail',
    component: MovieDetail,
    meta: { title: 'Movie Detail'} 
  },
  { 
    path: '/about', 
    name: 'About',
    component: About,
    meta: { title: 'About'} 
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
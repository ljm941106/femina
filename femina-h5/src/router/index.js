import Vue from 'vue'
import Router from 'vue-router'

const Index = () =>
  import('@/views/index')
const Preview = () =>
  import('@/views/preview')
const Description = () =>
  import('@/views/description')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      keepAlive: true
    },
  }, {
    path: '/preview',
    name: 'preview',
    component: Preview
  }, {
    path: '/description',
    name: 'description',
    component: Description
  }]
})
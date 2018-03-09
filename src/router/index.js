import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Problems from '@/components/Problems'
import Ranking from '@/components/Ranking'
import Signout from '@/components/Signout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/problems',
      name: 'problems',
      component: Problems
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/signout',
      name: 'signout',
      component: Signout
    }
  ]
})

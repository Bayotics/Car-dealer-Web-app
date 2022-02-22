import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageHome from '@/pages/PageHome'
import PageTradeDetail from '@/pages/PageTradeDetail'
import PageTradeFind from '@/pages/PageTradeFind'
import PageTradeFindPrice from '@/pages/PageTradeFindPrice'
import PageTradeFindBrand from '@/pages/PageTradeFindBrand'
import PageTradeCreate from '@/pages/PageTradeCreate'
import PageTradeEdit from '@/pages/PageTradeEdit'
import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'
import PageSecret from '@/pages/PageSecret'
import PageProfile from '@/pages/PageProfile'
import PageUserProfile from '@/pages/PageUserProfile'
import PageAbout from '@/pages/PageAbout'
import PageContact from '@/pages/PageContact'

import PageNotFound from '@/pages/PageNotFound'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/find/:category',
      name: 'PageTradeFindCategory',
      component: PageTradeFind,
      props: true
    },
    {
      path: '/find/:price',
      name: 'PageTradeFindPrice',
      component: PageTradeFindPrice,
      props: true
    },
    {
      path: '/find/:brand',
      name: 'PageTradeFindBrand',
      component: PageTradeFindBrand,
      props: true
    },
    {
      path: '/find',
      name: 'PageTradeFind',
      component: PageTradeFind
    },
    {
      path: '/about',
      name: 'PageAbout',
      component: PageAbout
    },  
    {
      path: '/contact',
      name: 'PageContact',
      component: PageContact
    },  
    {
      path: '/me',
      name: 'PageProfile',
      component: PageProfile,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/users/:id',
      name: 'PageUserProfile',
      component: PageUserProfile
    },
    {
      path: '/trades/new',
      name: 'PageTradeCreate',
      component: PageTradeCreate,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/trades/secret',
      name: 'PageSecret',
      component: PageSecret,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/trades/:id', 
      name: 'PageTradeDetail',
      component: PageTradeDetail
    },
    {
      path: '/trades/:tradeId/edit',
      name: 'PageTradeEdit',
      component: PageTradeEdit,
      meta: {onlyAuthUser: true},
      props: true
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/401',
      name: 'PageNotAuthenticated',
      component: PageNotAuthenticated
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser')
    .then(() => {
      const isAuthenticated = store.getters['auth/isAuthenticated']

      if (to.meta.onlyAuthUser) {
        if (isAuthenticated) {
          next()
        } else {
          next({name: 'PageNotAuthenticated'})
        }
      } else if (to.meta.onlyGuestUser) {
        if (isAuthenticated) {
          next({name: 'PageHome'})
        } else {
          next()
        }
      } else {
        next()
      }
    })
})







export default router
/* eslint-disable */
import { createWebHistory, createRouter } from "vue-router";

import mainRoutes      from '@/shared/routes/main.js'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

router.addRoutes = function(routes) {
  for (let idx in routes) {
    this.addRoute(routes[idx])
  }
}

router.addRoutes(mainRoutes)

const grey  = "color:#777"
const black = "color:black"

router.beforeEach((to, from, next) => {
  console.log("%cname:%c%s   %cpath:%c%s",
    grey, black, to.name, grey, black, to.path)
  next()
})

export default router
import Vue from 'vue'
import Router from 'vue-router'
import myRouter from 'my-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Vue.use(myRouter)

new myRouter({'gsd':"fdsaasf"})


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

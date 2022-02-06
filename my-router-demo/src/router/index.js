import Vue from 'vue'
// import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyRouter from 'my-router'

// Vue.use(Router)
Vue.use(MyRouter)

// new myRouter({'gsd':"fdsaasf"})


export default new MyRouter({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

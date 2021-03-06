import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Ranking from "../views/Ranking.vue";
import Rules from "../views/Rules.vue";
import VotesDetails from "../views/VotesDetails.vue";
import Authorize from "../views/Authorize.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      keepAlive:true,//需要被缓存的组件
      requireAuth:true 
    }
  },{
    path: "/Ranking",
    name: "Ranking",
    component: Ranking,
    meta:{
      keepAlive:false, //不需要被缓存的组件
      requireAuth:true 
    }
  },{
    path: "/Rules",
    name: "Rules",
    component: Rules,
    meta:{
      keepAlive:true, //需要被缓存的组件
      requireAuth:true 
    }
  },{
    path: "/VotesDetails",
    name: "VotesDetails",
    component: VotesDetails,
    meta:{
      keepAlive:false, //需要被缓存的组件
      requireAuth:true 
    }
  },{
    path: "/Authorize",
    name: "Authorize",
    component: Authorize,
    meta:{
      keepAlive:false, //需要被缓存的组件
    }
  }
];

const router = new VueRouter({
  // mode: "history",
   mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;

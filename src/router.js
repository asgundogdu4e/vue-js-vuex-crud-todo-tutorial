import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/",
      name: "homePage",
      component: () => import("./views/Vw-home.vue")
    },
    {
      path: "/todos",
      alias: "/todos",
      name: "todos",
      component: () => import("./views/todos/Vw-todos.vue")
    },
    {
      path: "/tutorials",
      alias: "/tutorials",      
      name: "tutorials",
      component: () => import("./views/todos/Vw-tutorials.vue")
    },
  ]
});



/*
{
  path: "/todos",
  component: todos,
  name: "todos",
}, */
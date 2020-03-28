import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Garden from "../views/Garden.vue";
import Firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      public: true
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      public: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/garden",
    name: "Garden",
    component: Garden
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = Firebase.auth().currentUser;
  const requiresAuth = !to.meta || !to.meta.public;
  if (requiresAuth && !currentUser) {
    next({ name: "Home" });
  } else if (to.name === "Home" && currentUser) {
    next({ name: "Garden" });
  } else {
    next();
  }
});

export default router;

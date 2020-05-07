import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Garden from "@/views/Garden.vue";
import Calendar from "@/views/Calendar.vue";
import Settings from "@/views/Settings.vue";
import PlantSearch from "@/views/PlantSearch.vue";
import PlantEdit from "@/views/PlantEdit.vue";
import Plant from "@/views/Plant.vue";
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
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
  {
    path: "/plants/search",
    name: "PlantSearch",
    component: PlantSearch
  },
  {
    path: "/plants/add",
    name: "PlantAdd",
    component: PlantEdit
  },
  {
    path: "/plants/:plantId/edit",
    name: "PlantEdit",
    component: PlantEdit
  },
  {
    path: "/plants/:plantId",
    name: "Plant",
    component: Plant
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

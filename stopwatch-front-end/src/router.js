import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/timers",
    name: "timers",
    component: () => import("./components/TimerList")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
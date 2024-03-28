import { createWebHistory, createRouter } from "vue-router";

import Home from "../pages/StartWork.vue";
import SelectOption from "../pages/SelectOption.vue";
import CreatePool from "../pages/CreatePool.vue";
import StakingPools from "../pages/StakingPools.vue";
import DisplayPool from "../pages/DisplayPool.vue";
import DashboardStakingPools from "../pages/dashboard/DashboardStakingPools.vue";
import DashboardDisplayPool from "../pages/dashboard/DashboardDisplayPool.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/select", component: SelectOption },
  { path: "/create", component: CreatePool },
  { path: "/pools", component: StakingPools },
  { path: "/pool/:id", component: DisplayPool },
  { path: "/dashboard/pools", component: DashboardStakingPools },
  { path: "/dashboard/pool/:id", component: DashboardDisplayPool },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

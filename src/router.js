import { createRouter, createWebHistory } from "vue-router";
import HomeIndexPageComponent from "./components/home/index/Page.vue";
import CountriesIndexPageComponent from "./components/dictionaries/countries/index/Page.vue";
import ElectionsIndexPage from "./components/elections/index/Page.vue";
import ElectionTypesIndexPage from "./components/dictionaries/election_types/index/Page.vue";

const routes = [
    { path: '/', component: HomeIndexPageComponent },
    { path: '/countries', component: CountriesIndexPageComponent },
    { path: '/elections', component: ElectionsIndexPage },
    { path: '/election_types', component: ElectionTypesIndexPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
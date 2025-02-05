import { createRouter, createWebHistory } from "vue-router";
import CountriesView from "@/views/CountriesView.vue";
import ElectionTypesView from "@/views/ElectionTypesView.vue";
import ElectionsView from "@/views/ElectionsView.vue";
import HomepageView from "@/views/HomepageView.vue";

const routes = [
    { path: '/', name: 'Home', component: HomepageView },
    { path: '/countries', name: 'Countries', component: CountriesView },
    { path: '/elections', name: 'Elections', component: ElectionsView },
    { path: '/election_types', name: 'ElectionTypes', component: ElectionTypesView },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
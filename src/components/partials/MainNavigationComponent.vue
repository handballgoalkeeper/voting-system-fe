<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Voting System</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li
              v-for="(navItem, index) in navItems" :key="index"
              :class="[
                  'nav-item',
                  { 'dropdown': !navItem.path && navItem.subNavItems.length > 0 }
              ]"
          >
            <router-link
                v-if="navItem.path"
                :to="navItem.path"
                :class="[
                    'nav-link',
                    { 'active': useRoute().path === navItem.path }
                ]"
            >
              <i :class="[
                  'bi',
                  navItem.icon
              ]"></i>
              {{ navItem.name }}
            </router-link>

            <div v-else>
              <a
                  :class="[
                      'nav-link',
                      'dropdown-toggle',
                      { 'active': navItem.subNavItems.map((subNavItem) => {
                        return subNavItem.path;
                      }).includes(useRoute().path) }
                  ]"
                  :id="navItem.name.toLowerCase() + 'Dropdown'"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
              >
                <i :class="[
                  'bi',
                  navItem.icon
                ]"></i>
                {{ navItem.name }}
              </a>
              <div class="dropdown-menu p-0" :aria-labelledby="navItem.name.toLowerCase() + 'Dropdown'">
                <RouterLink
                    v-for="(subNavItem, index) in navItem.subNavItems" :key="index"
                    :to="subNavItem.path"
                    :class="[
                        'dropdown-item',
                        'rounded',
                        { 'active': useRoute().path === subNavItem.path }
                    ]"
                >
                  <i :class="[
                    'bi',
                    subNavItem.icon
                  ]"></i>
                  {{ subNavItem.name }}
                </RouterLink>
              </div>
            </div>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import {useRoute} from "vue-router";
  import mainNavigationItems from "@/configs/mainNavigationConfig";

  export default {
    name: "MainNavigationComponent",
    methods: {
      useRoute
    },
    data() {
      return {
        navItems: mainNavigationItems,
      };
    },
  }
</script>

<style scoped>

</style>
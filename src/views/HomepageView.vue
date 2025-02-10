<template>
  <MainNavigationComponent />
  Home
</template>

<script>
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";


  export default {
    name: "HomepageView",
    components: {
      MainNavigationComponent
    },
    mounted() {
      document.title = process.env.VUE_APP_TITLE + ' | Home';
    }
  }
</script>

<style scoped>

</style>
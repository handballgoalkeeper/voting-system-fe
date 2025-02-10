<template>
  <MainNavigationComponent />
  <div class="container">
    <ElectionsTable ref="electionsTable" v-on:view="handleView" v-on:modify="handleEdit"/>
  </div>
</template>

<script>
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";
  import ElectionsTable from "@/components/elections/index/ElectionsTable.vue";

  export default {
    name: "ElectionsView",
    components: {
      MainNavigationComponent,
      ElectionsTable
    },
    methods: {
      handleView(data) {
        console.log(data);
      },
      handleEdit(data) {
        console.log(data);
      }
    },
    mounted() {
      document.title = process.env.VUE_APP_TITLE + ' | Elections';
    }
  }
</script>

<style scoped>

</style>
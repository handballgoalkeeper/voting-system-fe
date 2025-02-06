<template>
  <MainNavigationComponent />
  <div class="container">
    <ElectionTypesTable ref="electionTypesTable" v-on:view="handleView" v-on:edit="handleEdit"/>
  </div>
</template>

<script>
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";
  import ElectionTypesTable from "@/components/dictionaries/election_types/index/ElectionTypesTable.vue";

  export default {
    name: "ElectionTypesView",
    components: {
      MainNavigationComponent,
      ElectionTypesTable
    },
    methods: {
      handleView(data) {
        console.log(data);
      },
      handleEdit(data) {
        console.log(data);
      }
    },
  }
</script>

<style scoped>

</style>
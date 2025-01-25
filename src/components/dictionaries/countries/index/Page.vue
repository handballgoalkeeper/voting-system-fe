<template>
  <MainNavigationComponent ref="navBar"/>
  <div class="container">
    <CountriesTable v-on:view="handleView" v-on:modify="handleModify" />
  </div>
  <ModifyCountryModal
      :is-visible="modifyCountryModalVisible"
      :country="countryForModification"
      v-on:update:is-visible="(data) => { this.modifyCountryModalVisible = data; }"
      v-on:success="(response) => {console.log(response);}"
      v-on:error="(error) => {console.log(error);}"
  />
</template>

<script>
  import CountriesTable from "@/components/dictionaries/countries/index/CountriesTable.vue";
  import ModifyCountryModal from "@/components/dictionaries/countries/index/ModifyCountryModal.vue";
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";

  export default {
    name: "CountriesIndexPageComponent",
    components: {
      MainNavigationComponent,
      CountriesTable,
      ModifyCountryModal
    },
    data() {
      return {
        countryForModification: {},
        modifyCountryModalVisible: false,
      };
    },
    methods: {
      handleView(country) {
        console.log(country);
      },
      handleModify(country) {
        this.countryForModification = {...country};
        this.modifyCountryModalVisible = true;
      },
    },
  }
</script>

<style scoped>

</style>
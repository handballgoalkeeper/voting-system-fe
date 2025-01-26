<template>
  <SuccessAlert :text="successMessage" v-on:alert-expired="() => {this.successMessage = undefined;}"/>
  <ErrorAlert :text="errorMessage" v-on:alert-expired="() => {this.errorMessage = undefined;}" />
  <MainNavigationComponent ref="navBar"/>
  <div class="container">
    <CountriesTable ref="countriesTableComponent" v-on:view="handleView" v-on:modify="handleModify" />
  </div>
  <ModifyCountryModal
      :is-visible="modifyCountryModalVisible"
      :country="countryForModification"
      v-on:update:is-visible="(data) => { this.modifyCountryModalVisible = data; }"
      v-on:success="handleModificationSuccess"
      v-on:error="handleModificationError"
  />
</template>

<script>
  import CountriesTable from "@/components/dictionaries/countries/index/CountriesTable.vue";
  import ModifyCountryModal from "@/components/dictionaries/countries/index/ModifyCountryModal.vue";
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";
  import SuccessAlert from "@/components/partials/alerts/SuccessAlert.vue";
  import ErrorAlert from "@/components/partials/alerts/ErrorAlert.vue";

  export default {
    name: "CountriesIndexPageComponent",
    components: {
      ErrorAlert,
      SuccessAlert,
      MainNavigationComponent,
      CountriesTable,
      ModifyCountryModal
    },
    data() {
      return {
        countryForModification: {},
        modifyCountryModalVisible: false,
        successMessage: undefined,
        errorMessage: undefined,
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
      handleModificationSuccess() {
        this.$refs.countriesTableComponent.getAllCountries();
        this.successMessage = `Successfully changed country data.`;
      },
      handleModificationError() {
        this.errorMessage = 'Something went wrong, please try again or contact support.';
      },
    },
  }
</script>

<style scoped>

</style>
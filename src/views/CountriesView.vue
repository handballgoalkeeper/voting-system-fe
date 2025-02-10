<template>
  <SuccessAlert :text="successMessage" v-on:alert-expired="() => {this.successMessage = '';}"/>
  <ErrorAlert :text="errorMessage" v-on:alert-expired="() => {this.errorMessage = '';}" />
  <MainNavigationComponent ref="navBar"/>
  <div class="container-fluid my-2">
    <button class="btn btn-primary" v-on:click="() => {
      this.createCountryModalVisible = true;
    }">Create new country</button>
    <CreateCountryModal
        :is-visible="createCountryModalVisible"
        v-on:update:is-visible="(data) => { this.createCountryModalVisible = data; }"
        v-on:success="handleCreationSuccess"
        v-on:error="handleCreationError"
    />
  </div>
  <hr class="p-0 m-0">
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
  <ViewCountryModel
      :country="countryForDisplay"
      :is-visible="viewCountryModalVisible"
      v-on:update:is-visible="(data) => { this.viewCountryModalVisible = data; }"
  />
</template>

<script>

  import CreateCountryModal from "@/components/dictionaries/countries/index/CreateCountryModal.vue";
  import ErrorAlert from "@/components/partials/alerts/ErrorAlert.vue";
  import SuccessAlert from "@/components/partials/alerts/SuccessAlert.vue";
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";
  import CountriesTable from "@/components/dictionaries/countries/index/CountriesTable.vue";
  import ModifyCountryModal from "@/components/dictionaries/countries/index/ModifyCountryModal.vue";
  import ViewCountryModel from "@/components/dictionaries/countries/index/ViewCountryModel.vue";
  import {formatErrorMessage} from "@/utils/helper";

  export default {
    name: "CountriesView",
    components: {
      CreateCountryModal,
      ErrorAlert,
      SuccessAlert,
      MainNavigationComponent,
      CountriesTable,
      ModifyCountryModal,
      ViewCountryModel
    },
    data() {
      return {
        countryForModification: {},
        countryForDisplay: {},
        modifyCountryModalVisible: false,
        createCountryModalVisible: false,
        viewCountryModalVisible: false,
        successMessage: '',
        errorMessage: '',
      };
    },
    mounted() {
      document.title = process.env.VUE_APP_TITLE + ' | Countries';
    },
    methods: {
      handleView(country) {
        this.countryForDisplay = {...country};
        this.viewCountryModalVisible = true;
      },
      handleModify(country) {
        this.countryForModification = {...country};
        this.modifyCountryModalVisible = true;
      },
      handleModificationSuccess() {
        this.$refs.countriesTableComponent.getAllCountries();
        this.successMessage = `Successfully changed country data.`;
      },
      handleModificationError(response) {
        if (response.status === 422) {
          this.errorMessage = formatErrorMessage(response.response.data.errors, response.status);
        }
        else if (response.status === 400) {
          this.errorMessage = formatErrorMessage(response.response.data.errors, response.status);
        }
        else {
          this.errorMessage = 'Something went wrong, please try again or contact support.';
        }
      },
      handleCreationSuccess() {
        this.$refs.countriesTableComponent.getAllCountries();
        this.successMessage = 'Successfully created new country.'
      },
      handleCreationError(response) {
        if (response.status === 422) {
          this.errorMessage = formatErrorMessage(response.response.data.errors, response.status);
        }
        else {
          this.errorMessage = 'Something went wrong, please try again or contact support.';
        }
      }
    },
  }
</script>

<style scoped>

</style>
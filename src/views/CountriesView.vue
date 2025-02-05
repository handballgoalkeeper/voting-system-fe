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
</template>

<script>
  import CountriesTable from "@/components/dictionaries/countries/index/CountriesTable.vue";
  import ModifyCountryModal from "@/components/dictionaries/countries/index/ModifyCountryModal.vue";
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";
  import SuccessAlert from "@/components/partials/alerts/SuccessAlert.vue";
  import ErrorAlert from "@/components/partials/alerts/ErrorAlert.vue";
  import CreateCountryModal from "@/components/dictionaries/countries/index/CreateCountryModal.vue";

  export default {
    name: "CountriesView",
    components: {
      CreateCountryModal,
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
        createCountryModalVisible: false,
        successMessage: '',
        errorMessage: '',
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
      handleModificationError(response) {
        if (response.status === 422) {
          this.errorMessage = this.formatErrorMessage(response.response.data.errors, response.status);
        }
        else if (response.status === 400) {
          this.errorMessage = this.formatErrorMessage(response.response.data.errors, response.status);
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
          this.errorMessage = this.formatErrorMessage(response.response.data.errors, response.status);
        }
        else {
          this.errorMessage = 'Something went wrong, please try again or contact support.';
        }
      },
      formatErrorMessage(errors, status) {
        let message = '';

        if (status === 422) {
          Object.keys(errors).forEach(key => {
            message += errors[key] + '\n';
          });
        }
        else {
          errors.forEach(error => {
            message += error + '\n';
          });
        }

        return message;

      },
    },
  }
</script>

<style scoped>

</style>
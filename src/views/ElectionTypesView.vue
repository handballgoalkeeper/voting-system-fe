<template>
  <SuccessAlert :text="successMessage" v-on:alert-expired="() => {this.successMessage = '';}"/>
  <ErrorAlert :text="errorMessage" v-on:alert-expired="() => {this.errorMessage = '';}" />
  <MainNavigationComponent />
  <div class="container-fluid my-2">
    <button
        class="btn btn-primary"
        v-on:click="this.createElectionTypeModalVisible = true"
    >
      Create new election type
    </button>
    <CreateElectionTypesModal
        :is-visible="createElectionTypeModalVisible"
        v-on:update:is-visible="(data) => this.createElectionTypeModalVisible = data"
        v-on:success="handleCreatedSuccessfully"
        v-on:error="handleCreatedError"
    />
  </div>
  <hr>
  <div class="container">
    <ElectionTypesTable ref="electionTypesTableComponent" v-on:view="handleView" v-on:modify="handleModify" />
  </div>
  <ViewElectionTypeModal
      :election-type="electionTypeForDisplay"
      :is-visible="viewElectionTypeModalVisible"
      v-on:update:isVisible="(data) => viewElectionTypeModalVisible = data"
  />
  <ModifyElectionTypesModal
      :election-type="electionTypeForModification"
      :is-visible="modifyElectionTypeModalVisible"
      v-on:update:isVisible="(data) => modifyElectionTypeModalVisible = data"
      v-on:success="handleModificationSuccess"
      v-on:error="handleModificationError"
  />
</template>

<script>
  import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";
  import ElectionTypesTable from "@/components/dictionaries/election_types/index/ElectionTypesTable.vue";
  import ViewElectionTypeModal from "@/components/dictionaries/election_types/index/ViewElectionTypesModal.vue";
  import ModifyElectionTypesModal from "@/components/dictionaries/election_types/index/ModifyElectionTypesModal.vue";
  import {formatErrorMessage} from "@/utils/helper";
  import ErrorAlert from "@/components/partials/alerts/ErrorAlert.vue";
  import SuccessAlert from "@/components/partials/alerts/SuccessAlert.vue";
  import CreateElectionTypesModal from "@/components/dictionaries/election_types/index/CreateElectionTypesModal.vue";

  export default {
    name: "ElectionTypesView",
    components: {
      SuccessAlert, ErrorAlert,
      MainNavigationComponent,
      ElectionTypesTable,
      ViewElectionTypeModal,
      ModifyElectionTypesModal,
      CreateElectionTypesModal
    },
    methods: {
      handleView(data) {
        this.electionTypeForDisplay = {...data};
        this.viewElectionTypeModalVisible = true;
      },
      handleModify(data) {
        this.electionTypeForModification = {...data};
        this.modifyElectionTypeModalVisible = true;
      },
      handleModificationSuccess() {
        this.$refs.electionTypesTableComponent.getAllElectionTypes();
        this.successMessage = `Successfully changed election type data.`;
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
      handleCreatedSuccessfully() {
        this.$refs.electionTypesTableComponent.getAllElectionTypes();
        this.successMessage = `Successfully created new election type.`;
      },
      handleCreatedError(response) {
        if (response.status === 422) {
          this.errorMessage = formatErrorMessage(response.response.data.errors, response.status);
        }
        else if (response.status === 400) {
          this.errorMessage = formatErrorMessage(response.response.data.errors, response.status);
        }
        else {
          this.errorMessage = 'Something went wrong, please try again or contact support.';
        }
      }
    },
    data() {
      return {
        electionTypeForDisplay: {},
        electionTypeForModification: {},
        viewElectionTypeModalVisible: false,
        modifyElectionTypeModalVisible: false,
        createElectionTypeModalVisible: false,
        successMessage: '',
        errorMessage: '',
      };
    },
    mounted() {
      document.title = process.env.VUE_APP_TITLE + ' | Election types';
    }
  }
</script>

<style scoped>

</style>
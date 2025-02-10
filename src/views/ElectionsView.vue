<template>
  <MainNavigationComponent/>
  <SuccessAlert :text="successMessage" v-on:alert-expired="() => {this.successMessage = '';}"/>
  <ErrorAlert :text="errorMessage" v-on:alert-expired="() => {this.errorMessage = '';}"/>
  <div class="container-fluid my-2">
    <button
        class="btn btn-primary"
        v-on:click="createElectionModalVisible = true"
    >
      Create new election
    </button>
    <CreateElectionModal
        :is-visible="createElectionModalVisible"
        v-on:update:isVisible="data => createElectionModalVisible = data"
        v-on:success="handleCreateSuccess"
        v-on:error="handleCreateError"
    />
  </div>
  <div class="container">
    <ElectionsTable ref="electionsTableComponent" v-on:view="handleView" v-on:modify="handleEdit"/>
  </div>
</template>

<script>
import MainNavigationComponent from "@/components/partials/navigation/MainNavigationComponent.vue";
import ElectionsTable from "@/components/elections/index/ElectionsTable.vue";
import CreateElectionModal from "@/components/elections/index/CreateElectionModal.vue";
import {formatErrorMessage} from "@/utils/helper";
import ErrorAlert from "@/components/partials/alerts/ErrorAlert.vue";
import SuccessAlert from "@/components/partials/alerts/SuccessAlert.vue";

export default {
  name: "ElectionsView",
  components: {
    SuccessAlert, ErrorAlert,
    MainNavigationComponent,
    ElectionsTable,
    CreateElectionModal
  },
  data() {
    return {
      createElectionModalVisible: false,
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    handleView(data) {
      console.log(data);
    },
    handleEdit(data) {
      console.log(data);
    },
    handleCreateSuccess() {
      this.$refs.electionsTableComponent.getAllElections();
      this.successMessage = 'Successfully created new election.'
    },
    handleCreateError(response) {
      if (response.status === 422) {
        this.errorMessage = formatErrorMessage(response.response.data.errors, response.status);
      } else {
        this.errorMessage = 'Something went wrong, please try again or contact support.';
      }
    }
  },
  mounted() {
    document.title = process.env.VUE_APP_TITLE + ' | Elections';
  }
}
</script>

<style scoped>

</style>
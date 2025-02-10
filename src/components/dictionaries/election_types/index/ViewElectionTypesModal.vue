<template>
  <StaticBackdropModal
      :is-visible="modifyElectionTypesVisible"
      title="View election type"
      v-on:update:is-visible="(data) => {
        this.modifyElectionTypesVisible = data;
      }"
  >
    <template v-slot:body>
      <form>
        <div class="form-group">
          <label for="electionTypeNameInput">Name</label>
          <input
              type="text"
              class="form-control"
              id="electionTypeNameInput"
              v-model="electionTypeForDisplay.name"
              disabled
          />
        </div>
        <div class="form-group">
          <label for="descriptionInput">Description</label>
          <input
              type="text"
              class="form-control"
              id="descriptionInput"
              v-model="electionTypeForDisplay.description"
              disabled
          />
        </div>
        <div class="form-group">
          <label for="electionTypeCountryInput">Country</label>
          <input
              type="text"
              class="form-control"
              id="electionTypeNameInput"
              v-model="electionTypeForDisplay.country.name"
              disabled
          />
        </div>
        <div class="form-group">
          <label for="stagesCountInput">Number of stages</label>
          <input
              type="text"
              class="form-control"
              id="stagesCountInput"
              v-model="electionTypeForDisplay.required_stages_count"
              disabled
          />
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary" v-on:click="modifyElectionTypesVisible = false">Close</button>
    </template>
  </StaticBackdropModal>
</template>

<script>
import StaticBackdropModal from "@/components/partials/StaticBackdropModal.vue";

export default {
  name: "ViewElectionTypeModal",
  components: {
    StaticBackdropModal
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    electionType: {
      type: Object,
      required: true,
    }
  },
  emits: [
    'update:isVisible',
    'success',
    'error'
  ],
  watch: {
    isVisible(newValue) {
      this.modifyElectionTypesVisible = newValue;
    },
    electionType(newValue) {
      this.electionTypeForDisplay = {...newValue};
    },
    modifyElectionTypesVisible(newValue) {
      this.modifyElectionTypesVisible = newValue;
      this.$emit('update:isVisible', newValue);
    },
  },
  data() {
    return {
      modifyElectionTypesVisible: this.$props.isVisible,
      electionTypeForDisplay: undefined,
    };
  },
};
</script>

<style scoped>

</style>
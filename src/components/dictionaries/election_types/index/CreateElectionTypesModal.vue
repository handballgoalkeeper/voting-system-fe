<template>
  <StaticBackdropModal
      :is-visible="createElectionTypeModalVisible"
      title="Create new election type"
      v-on:update:is-visible="(data) => {
        this.createElectionTypeModalVisible = data;
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
              aria-describedby="electionTypeNameHelp"
              v-model="newElectionType.name"
              required
          >
          <small id="electionTypeNameHelp" class="form-text text-muted">Election type name.</small>
        </div>
        <div class="form-group">
          <label for="electionTypeDescriptionInput">Description</label>
          <input
              type="text"
              class="form-control"
              id="electionTypeDescriptionInput"
              aria-describedby="electionTypeDescriptionHelp"
              v-model="newElectionType.description"
          >
          <small id="electionTypeNameHelp" class="form-text text-muted">Election type description.</small>
        </div>
        <div>
          <label for="countrySelect">Country</label>
          <select
              v-model="newElectionType.country_id"
              class="form-select"
              aria-describedby="electionCountryHelp"
              required
          >
            <option selected :value="undefined">Select country...</option>
            <option v-for="(country, index) in countries" :key="index" :value="country.id">{{ country.name }}</option>
          </select>
          <small id="electionTypeCountryHelp" class="form-text text-muted">
            Country to which election type belongs.
          </small>
        </div>
        <div class="form-group">
          <label for="electionTypeRequiredStageCountInput">Stage count</label>
          <input
              type="number"
              class="form-control"
              id="electionTypeRequiredStageCountInput"
              aria-describedby="electionTypeDescriptionHelp"
              v-model="newElectionType.required_stages_count"
              required
          >
          <small id="electionTypeNameHelp" class="form-text text-muted">Election type stage count, ready to be
            modified.</small>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-success me-2" v-on:click="saveData">Save</button>
      <button type="button" class="btn btn-primary" v-on:click="createElectionTypeModalVisible = false">Close</button>
    </template>
  </StaticBackdropModal>
</template>

<script>
import StaticBackdropModal from "@/components/partials/StaticBackdropModal.vue";
import {create} from "@/services/electionTypesService";
import {findAll} from "@/services/countryService";

export default {
  name: "CreateElectionTypeModal",
  components: {
    StaticBackdropModal
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    }
  },
  mounted() {
    findAll().then(response => {
      this.countries = response.data;
    }).catch(error => this.$emit('error', error));
  },
  emits: [
    'update:isVisible',
    'success',
    'error'
  ],
  watch: {
    isVisible(newValue) {
      this.createElectionTypeModalVisible = newValue;
    },
    createElectionTypeModalVisible(newValue) {
      this.createElectionTypeModalVisible = newValue;
      this.$emit('update:isVisible', newValue);
    }
  },
  data() {
    return {
      createElectionTypeModalVisible: this.$props.isVisible,
      newElectionType: {
        name: undefined,
        description: undefined,
        country_id: undefined,
        required_stages_count: undefined,
      },
      countries: [],
    };
  },
  methods: {
    saveData() {
      create(this.newElectionType).then(response => {
        this.$emit('success', response);
      }).catch(error => {
        this.$emit('error', error)
      }).finally(() => {
        this.createElectionTypeModalVisible = false;
      });
    },
  },
};
</script>

<style scoped>

</style>
<template>
  <StaticBackdropModal
      :is-visible="modifyElectionTypeModalVisible"
      title="Modify election type"
      v-on:update:is-visible="(data) => {
        this.modifyElectionTypeModalVisible = data;
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
              v-model="electionTypeForModification.name"
          >
          <small id="electionTypeNameHelp" class="form-text text-muted">Election type name, ready to be modified.</small>
        </div>
        <div class="form-group">
          <label for="electionTypeDescriptionInput">Description</label>
          <input
              type="text"
              class="form-control"
              id="electionTypeDescriptionInput"
              aria-describedby="electionTypeDescriptionHelp"
              v-model="electionTypeForModification.description"
          >
          <small id="electionTypeNameHelp" class="form-text text-muted">Election type description, ready to be modified.</small>
        </div>
        <div>
          <label for="countrySelect">Country</label>
          <select
            v-model="electionTypeForModification.country.id"
            class="form-select"
            aria-describedby="electionCountryHelp"
          >
            <option v-for="(country, index) in countries" :key="index" :value="country.id">{{ country.name }}</option>
          </select>
          <small id="electionTypeCountryHelp" class="form-text text-muted">
            Country to which election type belongs, ready to be modified.
          </small>
        </div>
        <div class="form-group">
          <label for="electionTypeRequiredStageCountInput">Stage count</label>
          <input
              type="number"
              class="form-control"
              id="electionTypeRequiredStageCountInput"
              aria-describedby="electionTypeDescriptionHelp"
              v-model="electionTypeForModification.required_stages_count"
          >
          <small id="electionTypeNameHelp" class="form-text text-muted">Election type stage count, ready to be modified.</small>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-success me-2" v-on:click="saveData">Save</button>
      <button type="button" class="btn btn-primary" v-on:click="modifyElectionTypeModalVisible = false">Close</button>
    </template>
  </StaticBackdropModal>
</template>

<script>
  import StaticBackdropModal from "@/components/partials/StaticBackdropModal.vue";
  import {update} from "@/services/electionTypesService";
  import {findAll} from "@/services/countryService";
  import {adapt} from "@/adapters/countryTypeAdapter";

  export default {
    name: "ModifyElectionTypeModal",
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
    mounted() {
      findAll().then(response => {
        this.countries = response.data;
      }).catch(error => {
        this.$emit('error', error);
      }).finally(() => this.modifyElectionTypeModalVisible = false);
    },
    emits: [
        'update:isVisible',
        'success',
        'error'
    ],
    watch: {
      isVisible(newValue) {
        this.modifyElectionTypeModalVisible = newValue;
      },
      electionType(newValue) {
        this.electionTypeForModification = {...newValue};
      },
      modifyElectionTypeModalVisible(newValue) {
        this.modifyElectionTypeModalVisible = newValue;
        this.$emit('update:isVisible', newValue);
      }
    },
    data() {
      return {
        modifyElectionTypeModalVisible: this.$props.isVisible,
        electionTypeForModification: undefined,
        countries: [],
      };
    },
    methods: {
      saveData() {
        update(adapt(this.electionTypeForModification)).then(response => {
          this.$emit('success', response);
        }).catch(error => {
          this.$emit('error', error)
        }).finally(() => {
          this.modifyElectionTypeModalVisible = false;
        });
      },
    },
  };
</script>

<style scoped>

</style>
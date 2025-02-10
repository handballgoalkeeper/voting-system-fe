<template>
  <StaticBackdropModal
      :is-visible="createElectionModalVisible"
      title="Create new election"
      v-on:update:is-visible="(data) => {
        this.createElectionModalVisible = data;
      }"
  >
    <template v-slot:body>
      <form>
        <div class="form-group">
          <label for="countrySelect">Country</label>
          <select
            class="form-select"
            v-model="newElection.country_id"
            required
          >
            <option :value="undefined" selected>Please select country...</option>
            <option v-for="(country, index) in countries" :key="index" :value="country.id">{{ country.name }}</option>
          </select>
        </div>
        <div class="form-group" v-if="newElection.country_id !== undefined">
          <label for="electionTypeSelect">Election type</label>
          <select
            class="form-select"
            v-model="newElection.election_type_id"
            required
          >
            <option :value="undefined" selected>Please select election type...</option>
            <option v-for="(electionType, index) in electionTypes" :key="index" :value="electionType.id">{{ electionType.name }}</option>
          </select>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-success me-2" v-on:click="saveData">Save</button>
      <button type="button" class="btn btn-primary" v-on:click="createElectionModalVisible = false">Close</button>
    </template>
  </StaticBackdropModal>
</template>

<script>
  import StaticBackdropModal from "@/components/partials/StaticBackdropModal.vue";
  import {create} from "@/services/electionService";
  import {findAll as findAllCountries} from "@/services/countryService";
  import {findAllByCountryId} from "@/services/electionTypesService";

  export default {
    name: "CreateElectionModal",
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
      findAllCountries().then(response => {
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
        this.createElectionModalVisible = newValue;
      },
      createElectionModalVisible(newValue) {
        this.createElectionModalVisible = newValue;
        this.$emit('update:isVisible', newValue);
      },
      newElection: {
        handler(newValue) {
          if (newValue.country_id !== undefined) {
            findAllByCountryId(newValue.country_id)
                .then(response => this.electionTypes = response)
                .catch(error => this.$emit('error', error));
          }
        },
        deep: true,
      }
    },
    data() {
      return {
        createElectionModalVisible: this.$props.isVisible,
        newElection: {
          country_id: undefined,
          election_type_id: undefined,
        },
        countries: [],
        electionTypes: [],
      };
    },
    methods: {
      saveData() {
        create(this.newElection).then(response => {
          this.$emit('success', response);
        }).catch(error => {
          this.$emit('error', error)
        }).finally(() => {
          this.createElectionModalVisible = false;
        });
      },
    },
  };
</script>

<style scoped>

</style>
<template>
  <StaticBackdropModal
      :is-visible="createCountryModalVisible"
      title="Create new country"
      v-on:update:is-visible="(data) => {
        this.createCountryModalVisible = data;
      }"
  >
    <template v-slot:body>
      <form>
        <div class="form-group">
          <label for="countryNameInput">Name</label>
          <input
              type="text"
              class="form-control"
              id="countryNameInput"
              aria-describedby="countryNameHelp"
              ref="nameInput"
          >
          <small id="emailHelp" class="form-text text-muted">New country name, must be unique.</small>
        </div>
        <div class="form-group">
          <label for="countryTotalVotersInput">Total voters</label>
          <input
              type="number"
              min="0"
              class="form-control"
              id="countryTotalVotersInput"
              aria-describedby="countryTotalVotersHelp"
              ref="totalVotersInput"
          >
          <small id="countryTotalVotersHelp" class="form-text text-muted">Total number of voters for the country.</small>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-success me-2" v-on:click="saveData">Save</button>
      <button type="button" class="btn btn-primary" v-on:click="createCountryModalVisible = false;">Close</button>
    </template>
  </StaticBackdropModal>
</template>

<script>
  import StaticBackdropModal from "@/components/partials/StaticBackdropModal.vue";
  import {create} from "@/services/countryService";

  export default {
    name: "CreateCountryModal",
    components: {
      StaticBackdropModal
    },
    props: {
      isVisible: {
        type: Boolean,
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
        this.createCountryModalVisible = newValue;
      },
      createCountryModalVisible(newValue) {
        this.createCountryModalVisible = newValue;
        this.$emit('update:isVisible', newValue);
      },
    },
    data() {
      return {
        createCountryModalVisible: this.$props.isVisible,
      };
    },
    methods: {
      saveData() {
        let newCountry = {
          name: this.$refs.nameInput.value,
          total_voters: this.$refs.totalVotersInput.value
        };
        create(newCountry).then(response => {
          this.$emit('success', response);
        }).catch(error => {
          this.$emit('error', error)
        }).finally(() => {
          this.createCountryModalVisible = false;
        });
      },
    },
};
</script>

<style scoped>

</style>
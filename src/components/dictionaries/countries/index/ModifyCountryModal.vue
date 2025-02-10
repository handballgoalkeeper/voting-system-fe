<template>
  <StaticBackdropModal
      :is-visible="modifyCountryModalVisible"
      title="Modify country"
      v-on:update:is-visible="(data) => {
        this.modifyCountryModalVisible = data;
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
              v-model="countryForModification.name"
          >
          <small id="emailHelp" class="form-text text-muted">Country name, ready to be modified.</small>
        </div>
        <div class="form-group">
          <label for="countryTotalVotersInput">Total voters</label>
          <input
              type="number"
              min="0"
              class="form-control"
              id="countryTotalVotersInput"
              aria-describedby="countryTotalVotersHelp"
              v-model="countryForModification.total_voters"
          >
          <small id="countryTotalVotersHelp" class="form-text text-muted">Country total voters count, ready to be
            modified.</small>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-success me-2" v-on:click="saveData">Save</button>
      <button type="button" class="btn btn-primary" v-on:click="modifyCountryModalVisible = false">Close</button>
    </template>
  </StaticBackdropModal>
</template>

<script>
import StaticBackdropModal from "@/components/partials/StaticBackdropModal.vue";
import {update} from "@/services/countryService";

export default {
  name: "ModifyCountryModal",
  components: {
    StaticBackdropModal
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    country: {
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
      this.modifyCountryModalVisible = newValue;
    },
    country(newValue) {
      this.countryForModification = {...newValue};
    },
    modifyCountryModalVisible(newValue) {
      this.modifyCountryModalVisible = newValue;
      this.$emit('update:isVisible', newValue);
    },
  },
  data() {
    return {
      modifyCountryModalVisible: this.$props.isVisible,
      countryForModification: undefined,
    };
  },
  methods: {
    saveData() {
      update(this.countryForModification).then(response => {
        this.$emit('success', response);
      }).catch(error => {
        this.$emit('error', error)
      }).finally(() => {
        this.modifyCountryModalVisible = false;
      });
    },
  },
};
</script>

<style scoped>

</style>
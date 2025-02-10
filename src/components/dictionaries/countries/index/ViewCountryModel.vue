<template>
  <StaticBackdropModal
      :is-visible="modifyCountryModalVisible"
      title="View country"
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
              v-model="countryForDisplay.name"
              disabled
          >
        </div>
        <div class="form-group">
          <label for="countryTotalVotersInput">Total voters</label>
          <input
              type="number"
              min="0"
              class="form-control disabled"
              id="countryTotalVotersInput"
              aria-describedby="countryTotalVotersHelp"
              v-model="countryForDisplay.total_voters"
              disabled
          >
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-primary" v-on:click="modifyCountryModalVisible = false">Close</button>
    </template>
  </StaticBackdropModal>
</template>

<script>
import StaticBackdropModal from "@/components/partials/StaticBackdropModal.vue";

export default {
  name: "ViewCountryModal",
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
      this.countryForDisplay = {...newValue};
    },
    modifyCountryModalVisible(newValue) {
      this.modifyCountryModalVisible = newValue;
      this.$emit('update:isVisible', newValue);
    },
  },
  data() {
    return {
      modifyCountryModalVisible: this.$props.isVisible,
      countryForDisplay: undefined,
    };
  },
};
</script>

<style scoped>

</style>
<template>
  <AlertBase v-if="text" :alert-text="text" alert-main-color="success" :is-visible="true"
             v-on:alert-expired="() => this.$emit('alertExpired')">
    <template v-slot:alert-icon>
      <BootstrapIconsComponent icon-class="bi-check-circle" class="fs-1 text-success"/>
    </template>
  </AlertBase>
</template>

<script>
import BootstrapIconsComponent from "@/components/partials/BootstrapIconsComponent.vue";
import AlertBase from "@/components/partials/alerts/AlertBase.vue";

export default {
  name: 'SuccessAlert',
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  emits: ['alertExpired'],
  components: {AlertBase, BootstrapIconsComponent},

};
</script>

<style scoped>

</style>
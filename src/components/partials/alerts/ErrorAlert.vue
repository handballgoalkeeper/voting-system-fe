<template>
  <AlertBase v-if="text" :alert-text="text" alert-main-color="danger" :is-visible="true"
             v-on:alert-expired="() => this.$emit('alertExpired')">
    <template v-slot:alert-icon>
      <BootstrapIconsComponent icon-class="bi-x-octagon" class="fs-1 text-danger"/>
    </template>
  </AlertBase>
</template>

<script>
import BootstrapIconsComponent from "@/components/partials/BootstrapIconsComponent.vue";
import AlertBase from "@/components/partials/alerts/AlertBase.vue";

export default {
  name: 'ErrorAlert',
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
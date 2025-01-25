<template>
  <div class="dropdown">
    <a v-on:click.prevent role="button" class="no-style-link" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      <BootstrapIconsComponent icon-class="bi-three-dots" class="fs-5" />
    </a>

    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
import BootstrapIconsComponent from "@/components/partials/BootstrapIconsComponent.vue";

export default {
  name: "ThreeDotsDropdown",
  components: {BootstrapIconsComponent}
}
</script>

<style scoped>
  .no-style-link {
    text-decoration: none;
    color: inherit;
  }

  .no-style-link:not(:scope) {
    color: inherit;
  }
</style>
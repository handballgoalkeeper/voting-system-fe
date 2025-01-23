<template>
  <i :class="[
    'bi',
    iconClass
  ]" />
</template>

<script>
  export default {
    name: "BootstrapIconsComponent",
    props: {
      iconClass: {
        type: String,
        required: true,
      }
    }
  }
</script>
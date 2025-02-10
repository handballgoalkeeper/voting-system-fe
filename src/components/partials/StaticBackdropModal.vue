<template>
  <div class="custom-modal-wrapper d-flex justify-content-center align-items-center p-0 m-0" v-if="visible">
    <div class="custom-backdrop"></div>
    <div class="custom-modal bg-light rounded">
      <div class="custom-modal-header border-bottom py-2">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-10 col-md-10 text-lg-start text-md-start text-center">
              <h2>{{ title }}</h2>
            </div>
            <div class="col-lg-2 col-md-2 text-lg-start text-md-start text-center">
              <button class="btn btn-light float-lg-end float-md-end" v-on:click="visible = false">
                <BootstrapIconsComponent icon-class="bi-x-lg" class="float-end"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-modal-body p-2">
        <slot name="body"></slot>
      </div>
      <div class="custom-modal-footer border-top p-2">
        <div class="float-end pb-2">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BootstrapIconsComponent from "@/components/partials/BootstrapIconsComponent.vue";

export default {
  name: "StaticBackdropModal",
  components: {
    BootstrapIconsComponent
  },
  emits: ["update:isVisible"],
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  watch: {
    isVisible(newValue) {
      this.visible = newValue;
    },
    visible(newValue) {
      this.visible = newValue;
      this.$emit("update:isVisible", newValue);
    },
  },
  data() {
    return {
      visible: this.$props.isVisible,
    }
  },
};
</script>

<style scoped>
.custom-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.custom-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.custom-modal {
  height: auto;
  width: 40%;
  z-index: 100001;
}

@media (max-width: 767px) {
  .custom-modal {
    width: 95%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .custom-modal {
    width: 70%;
  }
}
</style>

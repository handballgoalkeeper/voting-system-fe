<template>
  <div v-if="visible" class="custom-alert-wrapper d-flex align-items-center justify-content-center w-100 position-fixed z-3">
    <div class="custom-alert p-3 rounded-bottom border border-dark-subtle d-flex align-items-center justify-content-center gap-3 position-relative bg-white">
      <span :class="['custom-progress-bar', `bg-${alertMainColor}`]" id="progress-bar"></span>
      <slot name="alert-icon" :class="[`text-${alertMainColor}`]"></slot>
      <p class="m-0 p-0">{{ capitalizedText }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AlertBase',
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      alertMainColor: {
        type: String,
        required: true
      },
      alertText: {
        type: String,
        required: true
      }
    },
    computed: {
      capitalizedText() {
        return this.$props.alertText.charAt(0).toUpperCase() + this.$props.alertText.slice(1);
      },
    },
    emits: ['alertExpired'],
    mounted() {
      if (this.isVisible) {
        let width = 100;
        const progressBar = document.getElementById('progress-bar');
        const interval = setInterval(() => {
          width -= 1;
          progressBar.style.width = `${width}%`;

          if (width === 0) {
            clearInterval(interval);
            this.visible = false;
            this.$emit('alertExpired');
          }
        }, 50);
      }
    },
    data() {
      return {
        visible: this.$props.isVisible,
      };
    },
    methods: {

    },
  };
</script>

<style scoped>
 .custom-alert {
   width: 30%;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
 }
 .custom-progress-bar {
   height: 4px;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
 }
 @media (max-width: 767px) {
   .custom-alert {
     width: 90%;
   }
 }

 @media (min-width: 768px) and (max-width: 991px) {
   .custom-alert {
     width: 60%;
   }
 }
</style>
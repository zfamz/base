<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      if (this.iconClass) {
        return 'svg-icon ' + this.iconClass;
      } else {
        return 'svg-icon';
      }
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  /* vertical-align: -0.15em; */
  color: #fff;
  fill: currentColor;
  overflow: hidden;
}
</style>

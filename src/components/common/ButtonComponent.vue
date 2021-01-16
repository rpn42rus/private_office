<template>
  <div
    class="btn"
    :style="basicButtonStyle()"
    @mouseover="event => changeColor(event)"
    @mouseleave="event => originalColor(event)"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',

  props: {
    buttonStyles: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },

  mounted() {},

  methods: {
    basicButtonStyle() {
      return {
        color: this.buttonStyles.color,
        border: this.buttonStyles.border,
        marginRight: this.buttonStyles.marginRight,
      };
    },
    changeColor(event) {
      event.target.style.backgroundColor = this.buttonStyles.bgColorHover;
      event.target.style.color = this.buttonStyles.colorHover;
    },
    originalColor(event) {
      event.target.style.backgroundColor = this.buttonStyles.bgColor;
      event.target.style.color = this.buttonStyles.color;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px 15px;
  border-radius: 10px;
  transition: all 0.3s ease-in;
  cursor: pointer;
}
</style>

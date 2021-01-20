<template>
  <div
    class="btn"
    :style="getBasicButtonStyle()"
    @mouseover="event => changeColor(event)"
    @mouseleave="event => originalColor(event)"
  >
    {{ textButton }}
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
    textButton: {
      type: String,
      required: true,
    },
  },

  methods: {
    /**
     * Метод получение основных стилей
     */
    getBasicButtonStyle() {
      return {
        color: this.buttonStyles.color,
        border: this.buttonStyles.border,
      };
    },

    /**
     * Метод изменения стилей при наведении
     */
    changeColor(event) {
      event.target.style.backgroundColor = this.buttonStyles.bgColorHover;
      event.target.style.color = this.buttonStyles.colorHover;
    },

    /**
     * Метод возвращения к оригинальным стилям
     */
    returnOriginalColor(event) {
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
  text-align: center;
  cursor: pointer;
}
</style>

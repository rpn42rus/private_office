<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModalWindow"></div>
    <div class="modal__content">
      dfklskdfghkldfg
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactModal',

  methods: {
    closeModalWindow() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal,
.modal__bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  &__bg {
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
  }
  &__content {
    background: #fff;
    z-index: 15;
  }
}
</style>

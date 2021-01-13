<template>
  <div class="modal">
    <div class="modal__bg" @click="closeModalWindow"></div>
    <div class="modal__content">
      <div class="modal__content-header">
        <div class="modal__header-title" v-if="modalMode === 'edit'">
          Редактировать контакт
        </div>
        <div class="modal__header-title" v-else>
          Добавить новый контакт
        </div>
      </div>
      <div class="modal__content-body">
        <div class="body__left-block">
          <div class="contact-photo" v-if="modalMode === 'edit'">
            <img class="character-image" :src="character.image" alt="" />
          </div>
        </div>
        <div class="body__right-block">
          <div class="contact-name"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactModal',

  props: {
    modalMode: String,
  },

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
    width: 500px;
    background: #fff;
    z-index: 15;
    &-header {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      background-color: #292828;
      .modal__header-title {
        color: #fff;
        font-size: 20px;
      }
    }
    &-body {
      width: 100%;
      display: flex;
      &__right-block,
      &__left-block {
        width: 50%;
      }
    }
  }
}
</style>

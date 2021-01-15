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
            <img :src="contactInfo.image" alt="" />
          </div>
        </div>
        <div class="body__right-block">
          <div class="contact-row">
            <label class="contact-label" for="name">Имя:</label>
            <input class="contact-input" name="name" type="text" v-model="contactInfo.name" />
          </div>
          <div class="contact-row">
            <label class="contact-label" for="gender">Пол:</label>
            <input class="contact-input" name="gender" type="text" v-model="contactInfo.gender" />
          </div>
          <div class="contact-row">
            <label class="contact-label" for="status">Статус:</label>
            <input class="contact-input" name="status" type="text" v-model="contactInfo.status" />
          </div>
          <div class="contact-row">
            <label class="contact-label" for="species">Статус:</label>
            <input class="contact-input" name="species" type="text" v-model="contactInfo.species" />
          </div>
        </div>
      </div>
      <div class="modal__content-footer">
        <div class="save-btn">Сохранить</div>
        <div class="cancel-btn">Отменить</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactModal',

  props: {
    modalMode: String,
    contactInfo: Object,
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
      background-color: #292828;
      .modal__header-title {
        color: #fff;
        font-size: 20px;
      }
    }
    &-body {
      width: 100%;
      display: flex;
      padding: 2%;
      .body__right-block {
        width: 53%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 2%;
        .contact-row {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 15px;
          .contact-label {
            margin-bottom: 5px;
            font-weight: bold;
          }
          .contact-input {
            width: 100%;
            border-radius: 3px;
            padding: 1%;
          }
        }
      }
      .body__left-block {
        width: 40%;
        .contact-photo {
          width: 100%;
          img {
            max-width: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>

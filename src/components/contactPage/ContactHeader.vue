<template>
  <header class="header">
    <div class="container">
      <div class="menu">
        <div class="btn-wrap">
          <button-component :buttonStyles="buttonStyles" :text="text" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ButtonComponent from '../common/ButtonComponent.vue';
export default {
  components: { ButtonComponent },
  name: 'ContactHeader',

  data() {
    return {
      buttonStyles: {
        color: '#fff',
        colorHover: 'rgb(37, 35, 35)',
        bgColor: 'transparent',
        bgColorHover: '#fff',
        border: '2px solid #fff',
        marginRight: '15px',
      },
      text: 'Выйти',
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: rgb(41, 40, 40);
  .container {
    max-width: 1620px;
    margin: 0 auto;
    padding: 0 15px;
    .menu {
      height: 70px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      .btn-wrap {
        margin-right: 15px;
      }
    }
  }
}
</style>

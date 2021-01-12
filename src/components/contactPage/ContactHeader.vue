<template>
  <header class="header">
    <div class="container">
      <div class="menu">
        <div class="menu__item">
          Выйти
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ContactHeader',
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
      &__item {
        padding: 10px 15px;
        border: 2px solid #fff;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          background-color: #fff;
          color: rgb(37, 35, 35);
        }
      }
    }
  }
}
</style>

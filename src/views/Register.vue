<template>
  <div>
    <form class="reg" @submit.prevent="reg">
      <div class="reg__title">Регистрация</div>
      <div class="reg__fields">
        <label class="field__label">Name:</label>
        <input class="field__input" required v-model="name" type="text" placeholder="Name" />
        <label class="field__label">Email:</label>
        <input class="field__input" required v-model="email" type="email" placeholder="Email" />
        <label class="field__label">Password:</label>
        <input
          class="field__input"
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <button class="reg__btn" type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.reg {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &__title {
    margin-bottom: 10px;
    font-size: 26px;
  }
  &__fields {
    .field__label {
      display: flex;
      font-size: 18px;
      margin: 10px 0 5px 0;
    }
    .field__input {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      outline: none;
    }
  }
  &__btn {
    width: 50%;
    margin: 20px auto;
    padding: 10px 15px;
    border-radius: 10px;
    color: #fff;
    background-color: #000;
    border: 2px solid #fff;
    transition: all 0.3s ease-in;
    outline: none;
    font-size: 20px;
    &:hover {
      color: #000;
      background-color: #fff;
      border: 2px solid #000;
      cursor: pointer;
    }
  }
}
</style>

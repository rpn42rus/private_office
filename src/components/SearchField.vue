<template>
  <div>
    <input class="search__input" type="text" placeholder="Поиск контакта" />
  </div>
</template>

<script>
export default {
  name: 'SearchField',
};
</script>

<style scoped lang="scss">
.search__input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  outline: none;
}
</style>

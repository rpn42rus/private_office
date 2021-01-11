<template>
  <div id="app">
    <contacts-list />
  </div>
</template>

<script>
import ContactsList from './views/ContactsList.vue';
export default {
  components: { ContactsList },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

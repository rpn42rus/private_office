<template>
  <div>
    <header-component />
    <contacts-list />
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import ContactsList from '../components/ContactsList.vue';
export default {
  name: 'Contacts',

  components: { HeaderComponent, ContactsList },
};
</script>

<style></style>

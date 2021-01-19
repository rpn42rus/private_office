<template>
  <div>
    <contact-header />
    <contact-list />
  </div>
</template>

<script>
import ContactHeader from '../components/contactPage/ContactHeader.vue';
import ContactList from '../components/contactPage/ContactList.vue';

export default {
  components: { ContactHeader, ContactList },
  name: 'Contacts',
};
</script>

<style></style>

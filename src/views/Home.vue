<template>
  <div>
    <contact-header />
    <contact-list />
  </div>
</template>

<script>
import ContactHeader from '../components/homePage/ContactHeader.vue';
import ContactList from '../components/homePage/ContactList.vue';

export default {
  components: { ContactHeader, ContactList },
  name: 'Contacts',
};
</script>

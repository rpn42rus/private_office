<template>
  <div>
    <h1>Список контактов</h1>
    <div class="grid-layout">
      <contact-card v-for="character in characters" :key="character.id" :character="character" />
    </div>
  </div>
</template>

<script>
import ContactCard from './ContactCard.vue';
export default {
  components: { ContactCard },
  name: 'ContactsList',

  data() {
    return {
      characters: [],
    };
  },

  mounted() {
    this.axios
      .get('https://rickandmortyapi.com/api/character')
      .then(response => (this.characters = response.data.results));
  },

  // created: async function() {
  //   try {
  //     const res = await fetch('https://rickandmortyapi.com/api/character');
  //     const characters = await res.json();
  //     console.log('characters :>> ', characters);
  //   } catch (error) {
  //     console.log('error :>> ', error);
  //   }
  // },
};
</script>

<style scoped lang="scss">
.grid-layout {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
  gap: 2rem;
  display: grid;
}
</style>

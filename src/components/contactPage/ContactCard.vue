<template>
  <div class="card-wrapper">
    <div class="card-image">
      <img class="character-image" :src="character.image" alt="" />
    </div>
    <div class="card__info-block">
      <div class="card-name">{{ character.name }}</div>
      <div class="card-controls">
        <div class="btn-wrap" @click="$emit('openEditModal', 'edit', character)">
          <button-component :buttonStyles="buttonStyles" :textButton="textButtonEdit" />
        </div>
        <div class="btn-wrap" @click="removeContact(character)">
          <button-component :buttonStyles="buttonStyles" :textButton="textButtonRemove" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '../common/ButtonComponent.vue';

import { mapActions } from 'vuex';
export default {
  components: { ButtonComponent },

  name: 'ContactCard',

  props: {
    character: Object,
  },

  data() {
    return {
      buttonStyles: {
        color: '#f8f9fa',
        colorHover: '#212529',
        bgColor: 'transparent',
        bgColorHover: '#f8f9fa',
        border: '2px solid #f8f9fa',
      },
      textButtonEdit: 'Edit',
      textButtonRemove: 'Remove',
    };
  },

  methods: {
    ...mapActions(['removeContact']),
  },
};
</script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease-in;
  -webkit-box-shadow: 4px 4px 10px 0px rgba(50, 50, 50, 0.76);
  -moz-box-shadow: 4px 4px 10px 0px rgba(50, 50, 50, 0.76);
  box-shadow: 4px 4px 10px 0px rgba(50, 50, 50, 0.76);
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
    border-radius: 5px;
  }
  &:hover .card__info-block {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
  }
  .card-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    .character-image {
      max-height: 20rem;
      max-width: 100%;
      min-width: 100%;
      object-fit: cover;
      display: block;
      height: auto;
      margin-left: auto;
      margin-right: auto;
      flex-shrink: 0;
      border-radius: 5px;
    }
  }
  .card__info-block {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.2s ease;
    .card-name {
      color: #fff;
      font-size: 26px;
      padding: 15px;
    }
    .card-controls {
      display: flex;
      margin-right: 0;
      margin-left: 0;
      margin-bottom: 20px;
      .btn-wrap {
        padding: 0 10px;
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
        position: relative;
        width: 100%;
        font-size: 1rem;
        line-height: 1.5;
      }
    }
  }
}
</style>

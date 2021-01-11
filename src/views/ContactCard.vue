<template>
  <div class="card-wrapper">
    <div class="card-image">
      <img class="character-image" :src="character.image" alt="" />
    </div>
    <div class="card__info-block">
      <div class="card-name">{{ character.name }}</div>
      <div class="card-controls">
        <div class="btn-wrap">
          <button class="btn">Edit</button>
        </div>
        <div class="btn-wrap">
          <button class="btn">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',

  props: {
    character: Object,
  },
};
</script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease-in;
  -webkit-box-shadow: 4px 4px 10px 0px rgba(50, 50, 50, 0.76);
  -moz-box-shadow: 4px 4px 10px 0px rgba(50, 50, 50, 0.76);
  box-shadow: 4px 4px 10px 0px rgba(50, 50, 50, 0.76);
  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  &:hover .card__info-block {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.6);
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
        .btn {
          display: block;
          width: 100%;
          color: #f8f9fa;
          border-color: #f8f9fa;
          font-weight: 400;
          text-align: center;
          user-select: none;
          background-color: transparent;
          border: 2px solid #fff;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: 0.25rem;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
            border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          text-transform: none;
          overflow: visible;
          outline: none;
          &:hover {
            cursor: pointer;
            color: #212529;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
          }
        }
      }
    }
  }
}
</style>

<template>
  <li class="plantentry">
    <b-link
      :to="'/plants/' + plant.plantId"
      router-tag="div"
      class="plantentry__container"
    >
      <img class="plantentry__img" :src="imgUrl" alt="" />
      <div class="plantentry__name">
        <h4 class="plantentry__title">{{ plant.displayName }}</h4>
        <small>{{ plant.sciName }}</small>
      </div>
      <div v-if="action" class="plantentry__action">
        <b-button variant="success" @click.stop="$emit('select', plant)">{{
          action
        }}</b-button>
      </div>
      <BIconChevronRight class="plantentry__arrow" />
    </b-link>
  </li>
</template>
<script>
import { BIconChevronRight } from "bootstrap-vue";

export default {
  name: "PlantListEntry",
  components: {
    BIconChevronRight
  },
  props: {
    plant: Object,
    action: { type: String, required: false }
  },
  computed: {
    imgUrl: function() {
      return this.plant.thumbUrl || this.plant.imgUrl || "/img/placeholder.png";
    }
  }
};
</script>
<style lang="scss">
.plantentry {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.plantentry:last-of-type {
  border-bottom: none;
}
.plantentry__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.plantentry__img {
  width: 75px;
  height: 75px;
  border-radius: 38px;
}
.plantentry__name {
  flex-grow: 1.2;
  text-align: left;
  padding-left: 20px;
  min-width: 0; /* Let the flex-child shrink */
  small {
    color: #aaa;
  }
}
.plantentry__title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.plantentry__action {
  padding: 0 1rem;
}
.plantentry__details {
  text-align: left;
  font-size: 13px;
}
.plantentry__trashactionicon {
  margin-right: 5px;
  font-size: 18px;
}
</style>

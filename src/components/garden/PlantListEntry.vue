<template>
  <li class="plantentry">
    <div class="plantentry__container" @click="expanded = !expanded">
      <img class="plantentry__img" :src="plant.imgUrl" alt="" />
      <div class="plantentry__name">
        <h4>{{ plant.name }}</h4>
        <small>{{ plant.latin }}</small>
      </div>
      <b-icon-chevron-down v-show="expanded" class="plantentry__arrow" />
      <b-icon-chevron-right v-show="!expanded" class="plantentry__arrow" />
    </div>
    <b-collapse v-model="expanded" class="plantentry__details">
      <div class="py-3">{{ plant.description }}</div>
      <ul class="list-unstyled pb-2">
        <plant-action-row
          v-for="action in plant.actions"
          :key="action.actionId"
          :action="action"
        />
      </ul>
      <div class="plantentry__addaction">
        <a href="javascript:;">
          <b-icon-plus class="plantentry__addactionicon" />
          Add action</a
        >
      </div>
    </b-collapse>
  </li>
</template>
<script>
import { BIconChevronRight, BIconChevronDown, BIconPlus } from "bootstrap-vue";
import PlantActionRow from "@/components/garden/PlantActionRow.vue";

export default {
  name: "PlantListEntry",
  components: {
    BIconChevronRight,
    BIconChevronDown,
    BIconPlus,
    PlantActionRow
  },
  data: function() {
    return {
      expanded: false
    };
  },
  props: {
    plant: Object
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
  small {
    color: #aaa;
  }
}
.plantentry__details {
  text-align: left;
  font-size: 13px;
}
.plantentry__addactionicon {
  margin-right: 5px;
  font-size: 18px;
}
</style>

<template>
  <li class="plantentry">
    <div class="plantentry__container">
      <img
        class="plantentry__img"
        :src="imgUrl"
        alt=""
        @click="expanded = !expanded"
      />
      <div class="plantentry__name" @click="expanded = !expanded">
        <h4>{{ plant.displayName }}</h4>
        <small>{{ plant.sciName }}</small>
      </div>
      <div v-if="action" class="plantentry__action">
        <b-button variant="success" @click="$emit('select', plant)">{{
          action
        }}</b-button>
      </div>
      <BIconChevronDown
        v-show="expanded"
        class="plantentry__arrow"
        @click="expanded = !expanded"
      />
      <BIconChevronRight
        v-show="!expanded"
        class="plantentry__arrow"
        @click="expanded = !expanded"
      />
    </div>
    <b-collapse v-model="expanded" class="plantentry__details">
      <div class="py-3">{{ plant.description }}</div>
      <ul class="list-unstyled pb-2">
        <PlantActionRow
          v-for="action in plant.actions"
          :key="action.actionId"
          :action="action"
        />
      </ul>
      <div v-if="showRemove" class="plantentry__trashaction">
        <a
          href="javascript:;"
          class="text-danger"
          @click="$emit('remove', plant)"
        >
          <BIconTrash class="plantentry__trashactionicon" />
          Remove from Garden</a
        >
      </div>
    </b-collapse>
  </li>
</template>
<script>
import { BIconChevronRight, BIconChevronDown, BIconTrash } from "bootstrap-vue";
import PlantActionRow from "@/components/garden/PlantActionRow.vue";

export default {
  name: "PlantListEntry",
  components: {
    BIconChevronRight,
    BIconChevronDown,
    BIconTrash,
    PlantActionRow
  },
  data: function() {
    return {
      expanded: false
    };
  },
  props: {
    plant: Object,
    action: { type: String, required: false },
    showRemove: { type: Boolean, default: true }
  },
  computed: {
    imgUrl: function() {
      return (
        this.plant.thumbUrl ||
        this.plant.imgUrl ||
        "https://picsum.photos/75/75"
      );
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
  small {
    color: #aaa;
  }
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

<template>
  <div class="plantdisplay">
    <div class="text-center">
      <img class="plantdisplay__img" :src="imgUrl" alt="" />
    </div>
    <b-button
      variant="link"
      size="lg"
      :to="'/plants/' + plant.plantId + '/edit'"
      class="plantdisplay__editbtn"
    >
      <BIconPencil />
    </b-button>

    <div class="my-4" v-if="plant.synonyms && plant.synonyms.length">
      <b>Also known as: </b>
      <span v-for="(syn, index) in plant.synonyms" :key="syn"
        >{{ syn
        }}<template v-if="index != plant.synonyms.length - 1"
          >,
        </template></span
      >
    </div>

    <div class="my-4">
      <p>{{ plant.description }}</p>
    </div>

    <ul v-if="plant.actions && plant.actions.length" class="list-unstyled pb-2">
      <PlantActionRow
        v-for="action in plant.actions"
        :key="action.actionId"
        :action="action"
      />
    </ul>
  </div>
</template>

<script>
import { BIconPencil } from "bootstrap-vue";
import PlantActionRow from "@/components/garden/PlantActionRow.vue";

export default {
  name: "PlantDisplay",
  components: {
    BIconPencil,
    PlantActionRow
  },
  props: {
    plant: { type: Object, required: true }
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
.plantdisplay {
  position: relative;
  padding-top: 20px;
}
.plantdisplay__img {
  width: 150px;
  height: 150px;
  border-radius: 75px;
}
.plantdisplay__editbtn {
  position: absolute;
  top: 10px;
  right: 0;
}
</style>

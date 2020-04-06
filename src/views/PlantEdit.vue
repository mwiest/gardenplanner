<template>
  <b-container fluid class="text-left">
    <h2>Add plant</h2>
    <plant-form :plant.sync="plant" />
    <pre>{{ plant }}</pre>
  </b-container>
</template>

<script>
//import { BIconCalendar, BIconPlus } from "bootstrap-vue";
import PlantForm from "@/components/garden/PlantForm.vue";

export default {
  name: "PlantEdit",
  components: {
    PlantForm
  },
  props: {
    existing: Boolean
  },
  data: function() {
    return {
      plant: {
        plantId: "OIEUIEJJHDSJS-08094",
        displayName: "Monk's Pepper",
        synonyms: ["Hello", "world"],
        sciName: "Vitex agnus-castus",
        imgUrl:
          "https://firebasestorage.googleapis.com/v0/b/gardenplanner-cdd8b.appspot.com/o/plants%2FOIEUIEJJHDSJS-08094.jpg?alt=media&token=25a81e88-a110-42af-abc9-148238b5bf9e",
        description:
          "The Latin name Agnus castus means “chaste lamb” in reference to the early belief that it reduced sexual desire (it does not). Monks used it in ancient times. A tincture of the fresh berries was often used by the eclectic physicians as a galactagogue and emmenagogue. The primary use of this botanical has long occurred throughout Europe with traditional use for a variety of female hormone and gynecological conditions. The German Commission E has approved the use of Chaste Tree extract for the treatment of PMS. It is widely used in Germany and in Europe.",
        actions: [
          {
            plantActionId: "128736-IEFKHDAFJ",
            dateName: "Early Spring",
            date: "03-01",
            name: "Cut",
            details:
              "Cut all straight upward branches and most new branches, keep a few and remove a few old branches, keeping the shape."
          },
          {
            plantActionId: "02932913-KWBEWNBBE",
            dateName: "September",
            date: "09-01",
            name: "Harvest",
            details:
              "Collect all nuts from the ground and remaining ones on the branches."
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss"></style>

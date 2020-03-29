<template>
  <div class="garden">
    <ul class="list-unstyled">
      <plant-list-entry
        v-for="plant in plants"
        :plant="plant"
        :key="plant.plantId"
      />
    </ul>
  </div>
</template>
<script>
import PlantListEntry from "@/components/garden/PlantListEntry.vue";

export default {
  name: "Garden",
  components: {
    PlantListEntry
  },
  data: function() {
    return {
      plants: [
        {
          plantId: "JHSDKAHDSJS-08098",
          name: "Hazel",
          latin: "Corylus",
          imgUrl:
            "data:image/jpeg;base64,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",
          description:
            "The hazel (Corylus) is a genus of deciduous trees and large shrubs native to the temperate Northern Hemisphere. The genus is usually placed in the birch family Betulaceae,[2][3][4][5] though some botanists split the hazels (with the hornbeams and allied genera) into a separate family Corylaceae.[6][7] The fruit of the hazel is the hazelnut.",
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
        },
        {
          plantId: "OIEUIEJJHDSJS-08094",
          name: "Monk's Pepper",
          latin: "Vitex agnus-castus",
          imgUrl:
            "data:image/jpeg;base64,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",
          description:
            "The Latin name Agnus castus means “chaste lamb” in reference to the early belief that it reduced sexual desire (it does not). Monks used it in ancient times. A tincture of the fresh berries was often used by the eclectic physicians as a galactagogue and emmenagogue. The primary use of this botanical has long occurred throughout Europe with traditional use for a variety of female hormone and gynecological conditions. The German Commission E has approved the use of Chaste Tree extract for the treatment of PMS. It is widely used in Germany and in Europe."
        }
      ]
    };
  }
};
</script>

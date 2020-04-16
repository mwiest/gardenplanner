<template>
  <div class="garden">
    <h2>{{ userName }}'s Garden</h2>
    <ul class="list-unstyled">
      <plant-list-entry
        v-for="plant in plants"
        :plant="plant"
        :key="plant.plantId"
        @remove="onRemove"
      />
    </ul>
    <b-container fluid>
      <b-button block pill variant="primary" to="/plants/search">Add</b-button>
    </b-container>
  </div>
</template>
<script>
import PlantListEntry from "@/components/garden/PlantListEntry.vue";
import Firebase from "firebase";

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
          displayName: "Hazel",
          synonyms: [],
          sciName: "Corylus",
          imgUrl:
            "https://firebasestorage.googleapis.com/v0/b/gardenplanner-cdd8b.appspot.com/o/plants%2FJHSDKAHDSJS-08098.jpg?alt=media&token=5da530d3-b47f-4533-bcec-8a69e379ef7c",
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
          displayName: "Monk's Pepper",
          synonyms: [],
          sciName: "Vitex agnus-castus",
          imgUrl:
            "https://firebasestorage.googleapis.com/v0/b/gardenplanner-cdd8b.appspot.com/o/plants%2FOIEUIEJJHDSJS-08094.jpg?alt=media&token=25a81e88-a110-42af-abc9-148238b5bf9e",
          description:
            "The Latin name Agnus castus means “chaste lamb” in reference to the early belief that it reduced sexual desire (it does not). Monks used it in ancient times. A tincture of the fresh berries was often used by the eclectic physicians as a galactagogue and emmenagogue. The primary use of this botanical has long occurred throughout Europe with traditional use for a variety of female hormone and gynecological conditions. The German Commission E has approved the use of Chaste Tree extract for the treatment of PMS. It is widely used in Germany and in Europe."
        }
      ]
    };
  },
  methods: {
    onRemove: function(plant) {
      const userId = Firebase.auth().currentUser.uid;
      const db = Firebase.database();
      db.ref("gardens/" + userId)
        .orderByChild("plantId")
        .equalTo(plant.plantId)
        .once("value", snap => {
          snap.forEach(p => {
            db.ref("gardens/" + userId + "/" + p.key).remove();
          });
        });
    }
  },
  computed: {
    userName: function() {
      return Firebase.auth().currentUser.displayName;
    }
  },
  mounted: function() {
    const userId = Firebase.auth().currentUser.uid;
    const gardenRef = Firebase.database().ref("gardens/" + userId);
    gardenRef.on("value", gardenSnapshot => {
      this.plants = gardenSnapshot.val();
    });
  }
};
</script>

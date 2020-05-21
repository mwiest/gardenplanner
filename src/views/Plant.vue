<template>
  <b-container fluid class="text-left">
    <PlantDisplay :plant="plant" />
    <b-button
      v-show="!added"
      block
      variant="success"
      @click="onAdd"
      class="mb-2"
    >
      <BIconPlus /> Zum Garten hinzufügen
    </b-button>
    <b-button
      v-show="added"
      block
      variant="danger"
      @click="onRemove"
      class="mb-2"
    >
      <BIconTrash /> Vom Garten entfernen
    </b-button>
  </b-container>
</template>

<script>
import PlantDisplay from "@/components/garden/PlantDisplay.vue";
import { BIconTrash, BIconPlus } from "bootstrap-vue";
import Firebase from "firebase";

export default {
  name: "Plant",
  components: {
    PlantDisplay,
    BIconTrash,
    BIconPlus
  },
  data: function() {
    return {
      plant: {
        actions: []
      },
      added: false
    };
  },
  methods: {
    evaluateAdded: async function(snap) {
      let added = false;
      await snap.forEach(p => {
        if (p.val().plantId === this.plant.plantId) {
          added = true;
        }
      });
      this.added = added;
    },
    onAdd: function() {
      const userId = Firebase.auth().currentUser.uid;
      const gardenRef = Firebase.database().ref("gardens/" + userId);
      const entryRef = gardenRef.push();
      entryRef.set(this.plant).then(() => {
        this.$router.push("/garden");
      });
    },
    onRemove: function() {
      const userId = Firebase.auth().currentUser.uid;
      const gardenRef = Firebase.database().ref("gardens/" + userId);
      gardenRef.once("value").then(snap => {
        snap.forEach(p => {
          if (p.val().plantId === this.plant.plantId) {
            p.ref.remove();
          }
        });
        this.$router.push("/garden");
      });
    }
  },
  mounted: function() {
    if (this.$route.params.plantId) {
      const plantRef = Firebase.database().ref(
        "plants/" + this.$route.params.plantId
      );
      plantRef.once("value").then(plantSnapshot => {
        this.plant = { plantId: plantSnapshot.key, ...plantSnapshot.val() };
        const userId = Firebase.auth().currentUser.uid;
        const gardenRef = Firebase.database().ref("gardens/" + userId);
        gardenRef.on("value", snap => {
          this.evaluateAdded(snap);
        });
      });
    }
  }
};
</script>

<style lang="scss">
.backbutton {
  background-color: #eeeeee;
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  vertical-align: baseline;
  color: #777777;
  display: inline-block;
  padding: 0 0.1em;
}
</style>

<template>
  <div class="garden">
    <h2>{{ userName }}'s Garten</h2>
    <ul class="list-unstyled">
      <PlantListEntry
        v-for="plant in plants"
        :plant="plant"
        :key="plant.plantId"
        @remove="onRemove"
      />
    </ul>
    <b-container fluid>
      <b-button block pill variant="primary" to="/plants/search"
        >Hinzu</b-button
      >
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
      plants: []
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

<template>
  <b-container fluid class="text-left">
    <h2>
      <a @click="$router.go(-1)" class="backbutton mr-1"><BIconArrowLeft /></a>
      Suche nach Pflanzen
    </h2>
    <PlantSearchForm @select="onSelect" :excludePlants="garden" />
  </b-container>
</template>

<script>
import { BIconArrowLeft } from "bootstrap-vue";
import PlantSearchForm from "@/components/garden/PlantSearchForm.vue";
import Firebase from "firebase";

export default {
  name: "PlantSearch",
  components: {
    PlantSearchForm,
    BIconArrowLeft
  },
  data: function() {
    return {
      garden: []
    };
  },
  methods: {
    onSelect: function(plant) {
      const userId = Firebase.auth().currentUser.uid;
      const gardenRef = Firebase.database().ref("gardens/" + userId);
      const entryRef = gardenRef.push();
      entryRef.set(plant).then(() => {});
    }
  },
  mounted: function() {
    const userId = Firebase.auth().currentUser.uid;
    const gardenRef = Firebase.database().ref("gardens/" + userId);
    gardenRef.on("value", snap => {
      this.garden.splice(0, this.garden.length);
      snap.forEach(p => {
        this.garden.push(p.val());
      });
    });
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

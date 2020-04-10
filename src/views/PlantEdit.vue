<template>
  <b-container fluid class="text-left">
    <h2>
      <a @click="$router.go(-1)" class="backbutton mr-1"
        ><b-icon-arrow-left
      /></a>
      Add plant
    </h2>
    <plant-form :plant="plant" :key="plant.plantId" @onSubmit="onSubmit" />
  </b-container>
</template>

<script>
import PlantForm from "@/components/garden/PlantForm.vue";
import { BIconArrowLeft } from "bootstrap-vue";
import Firebase from "firebase";

export default {
  name: "PlantEdit",
  components: {
    PlantForm,
    BIconArrowLeft
  },
  data: function() {
    return {
      plant: {
        actions: []
      }
    };
  },
  mounted: function() {
    if (this.$route.params.plantId) {
      const plantRef = Firebase.database().ref(
        "plants/" + this.$route.params.plantId
      );
      plantRef.once("value").then(plantSnapshot => {
        this.plant = { plantId: plantSnapshot.key, ...plantSnapshot.val() };
        if (!this.plant.actions) {
          this.$set(this.plant, "actions", []);
        }
      });
    }
  },
  methods: {
    onSubmit: function(plantForm) {
      if (plantForm.plantId) {
        // Existing
        const { plantId, ...plant } = plantForm; // PlantId should not be on the stored document
        Firebase.database()
          .ref("plants/" + plantId)
          .set(plant)
          .then(() => {
            this.$root.$bvToast.toast("Plant updated", {
              variant: "success",
              toaster: "b-toaster-top-center",
              autoHideDelay: 1000
            });
            this.$router.push({ name: "Garden" });
          });
      } else {
        // New
        const plantsRef = Firebase.database().ref("plants");
        const newKey = plantsRef.push().key;
        plantsRef
          .child(newKey)
          .set(plantForm)
          .then(() => {
            this.$root.$bvToast.toast("Plant saved", {
              variant: "success",
              toaster: "b-toaster-top-center",
              autoHideDelay: 1000
            });
            this.$router.push({ name: "Garden" });
          });
      }
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

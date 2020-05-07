<template>
  <b-container fluid class="text-left">
    <h2>
      <a @click="$router.go(-1)" class="backbutton mr-1"><BIconArrowLeft /></a>
      <span v-if="!plant.plantId">Add plant</span>
      <span v-if="!!plant.plantId">Edit plant</span>
    </h2>
    <PlantForm :plant="plant" :key="plant.plantId" @onSubmit="onSubmit" />
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
    onSubmit: async function(plantForm) {
      if (plantForm.plantId) {
        // Existing
        const { plantId, imageFile, ...plant } = plantForm; // PlantId should not be on the stored document
        let imgUrl = plantForm.imgUrl;
        if (imageFile) {
          const imgRef = Firebase.storage().ref("plants/" + plantId + ".jpg");
          await imgRef.put(imageFile);
          imgUrl = await imgRef.getDownloadURL();
        }
        Firebase.database()
          .ref("plants/" + plantId)
          .update({ imgUrl, ...plant })
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
        const { imageFile, ...plant } = plantForm; // PlantId should not be on the stored document
        const plantsRef = Firebase.database().ref("plants");
        const newKey = plantsRef.push().key;
        const imgRef = Firebase.storage().ref("plants/" + newKey + ".jpg");
        await imgRef.put(imageFile);
        const imgUrl = await imgRef.getDownloadURL();
        plantsRef
          .child(newKey)
          .update({ imgUrl, ...plant })
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

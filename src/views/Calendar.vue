<template>
  <div class="calendar">
    <ul class="list-unstyled">
      <CalActionItem
        v-for="plantAction in activeActions"
        :key="plantAction.plantActionId"
        :plant-action="plantAction"
        @completed="onCompleted"
      />
    </ul>
  </div>
</template>

<script>
import CalActionItem from "@/components/calendar/CalActionItem.vue";
import Firebase from "firebase";

export default {
  name: "Calendar",
  components: {
    CalActionItem
  },
  data: function() {
    return {
      plantActions: [],
      completions: []
    };
  },
  computed: {
    activeActions: function() {
      return this.plantActions.filter(a => {
        return !this.completions.some(c => {
          return c.plantActionId === a.plantActionId;
        });
      });
    }
  },
  methods: {
    onCompleted(plantAction) {
      setTimeout(() => {
        if (plantAction.completed) {
          const userId = Firebase.auth().currentUser.uid;
          const completions = Firebase.database().ref("completions/" + userId);
          completions.push().set({
            plantActionId: plantAction.plantActionId,
            completedAt: Firebase.database.ServerValue.TIMESTAMP
          });
          const idx = this.plantActions.findIndex(pa => pa === plantAction);
          this.plantActions.splice(idx, 1);
        }
      }, 2000);
    }
  },
  mounted: function() {
    const userId = Firebase.auth().currentUser.uid;
    const garden = Firebase.database().ref("gardens/" + userId);
    const completions = Firebase.database().ref("completions/" + userId);

    completions.on("child_added", snap => {
      this.completions.push(snap.val());
    });

    garden.on("child_added", snap => {
      const plant = snap.val();
      if (plant.actions && plant.actions.length) {
        plant.actions.forEach(a => {
          this.plantActions.push({
            plantActionId: plant.plantId + "_" + a.plantActionId + "2020",
            ...a,
            plant
          });
        });
      }
    });
  }
};
</script>

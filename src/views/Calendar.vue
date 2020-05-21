<template>
  <div class="calendar">
    <ul v-if="activeActions.length" class="list-unstyled">
      <CalActionItem
        v-for="plantAction in activeActions"
        :key="plantAction.plantActionId"
        :plant-action="plantAction"
        @completed="onCompleted"
      />
    </ul>
    <b-container v-else-if="plantActions.length" fluid class="calempty">
      <BIconCalendar class="calempty__icon" />
      <p>Momentan gibt es nichts zu tun, grossartig!</p>
    </b-container>
    <b-container v-else fluid class="calempty">
      <BIconCalendar class="calempty__icon" />
      <p>
        Füge zuerst Pflanzen zu deinem Garten hinzu um zu sehen was er zu tun
        gibt.
      </p>
      <b-button pill block variant="primary" to="/plants/search"
        >Zur Pflanzensuche</b-button
      >
    </b-container>
  </div>
</template>

<script>
import CalActionItem from "@/components/calendar/CalActionItem.vue";
import Firebase from "firebase";
import { BIconCalendar } from "bootstrap-vue";

export default {
  name: "Calendar",
  components: {
    CalActionItem,
    BIconCalendar
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
<style lang="scss">
.calempty {
  color: gray;
}
.calempty__icon {
  font-size: 50vw;
  opacity: 0.3;
}
</style>

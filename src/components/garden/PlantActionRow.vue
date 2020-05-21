<template>
  <li class="plantaction">
    <div class="plantaction__container">
      <BIconCalendar class="plantaction__icon" />
      <span class="plantaction__action"
        >{{ action.dateName }}: {{ action.name }}</span
      >
      <b-button variant="link" @click="expanded = !expanded"
        ><BIconChevronDown v-show="expanded"/><BIconChevronRight
          v-show="!expanded"
      /></b-button>
    </div>
    <b-collapse v-model="expanded" class="plantaction__details">
      <div class="mb-2 text-muted"><b>Erinnerung ab: </b>{{ action.date }}</div>
      <b>Vorgehen: </b>{{ action.details }}
    </b-collapse>
  </li>
</template>
<script>
import {
  BIconCalendar,
  BIconChevronRight,
  BIconChevronDown
} from "bootstrap-vue";

export default {
  name: "PlantActionRow",
  components: {
    BIconCalendar,
    BIconChevronRight,
    BIconChevronDown
  },
  props: {
    action: Object
  },
  data: function() {
    return {
      expanded: false
    };
  }
};
</script>
<style lang="scss">
.plantaction__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.plantaction__icon {
  font-size: 18px;
  margin-right: 5px;
}
.plantaction__action {
  flex-basis: 100%;
}
.plantaction__details {
  margin-bottom: 1rem;
  padding-left: 22px;
  font-size: 13px;
}
</style>

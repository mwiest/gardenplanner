<template>
  <li class="plantaction">
    <b-icon-calendar class="plantaction__icon" />
    <span class="plantaction__action"
      >{{ action.dateName }}: {{ action.name }}</span
    >
    <b-button variant="link"><b-icon-pencil /></b-button>
  </li>
</template>
<script>
import { BIconCalendar, BIconPencil } from "bootstrap-vue";

export default {
  name: "PlantActionRow",
  components: {
    BIconCalendar,
    BIconPencil
  },
  props: {
    action: Object
  }
};
</script>
<style lang="scss">
.plantaction {
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
</style>

<template>
  <nav class="mainnav">
    <ul class="mainnav__list">
      <li>
        <router-link to="/calendar" class="mainnav__link"
          ><BIconCalendar class="mainnav__icon" /><br />
          Kalender</router-link
        >
      </li>
      <li>
        <router-link to="/garden" class="mainnav__link"
          ><BIconHouse class="mainnav__icon" /><br />
          Garten</router-link
        >
      </li>
      <li>
        <router-link to="/settings" class="mainnav__link"
          ><BIconGear class="mainnav__icon" /><br />
          Einstellungen</router-link
        >
      </li>
    </ul>
  </nav>
</template>
<script>
import { BIconCalendar, BIconHouse, BIconGear } from "bootstrap-vue";
export default {
  components: {
    BIconCalendar,
    BIconHouse,
    BIconGear
  }
};
</script>
<style lang="scss">
.mainnav {
  border-top: 1px solid #aaa;
  background: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 5px 15px;
}
.mainnav__list {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  .router-link-active {
    color: #42b983;
  }
  line-height: 1.1;
}
.mainnav__icon {
  width: 32px;
  height: 32px;
}
.mainnav__link {
  font-size: 11px;
  text-align: center;
  display: inline-block;
}
</style>

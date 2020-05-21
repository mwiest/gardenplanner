<template>
  <head class="mainhead">
    <img class="mainhead__logo" alt="Logo" src="@/assets/logo.png" />
    <h1 class="mainhead__title">Gartenplaner</h1>
    <b-button class="mainhead__logout" title="Logout" @click="$emit('onLogout')"
      ><BIconBoxArrowRight class="mainhead__logouticon"
    /></b-button>
  </head>
</template>
<script>
import { BIconBoxArrowRight } from "bootstrap-vue";
export default {
  components: {
    BIconBoxArrowRight
  }
};
</script>
<style lang="scss">
.mainhead {
  background: #42b983;
  display: flex;
  justify-content: space-between;
}
.mainhead__logo {
  width: 40px;
  height: 40px;
  margin: 10px 15px;
}
.mainhead__title {
  color: white;
  font-size: 24px;
  margin: 15px;
}
.mainhead__logout {
  background: transparent !important;
  border: none !important;
}
.mainhead__logouticon {
  width: 32px;
  height: 32px;
}
</style>

<template>
  <div class="about">
    <img alt="Logo" src="../assets/logo.png" />
      <h1>Garden</h1>
    <b-button @click="onLogout">Logout</b-button>
  </div>
</template>
<script>
import Firebase from "firebase";

export default {
    name: "Garden",
    methods: {
        onLogout: function() {
            Firebase.auth().signOut().then(() => {
                this.$router.replace({name: "Home"});
            });
        }
    }
}
</script>
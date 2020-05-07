<template>
  <div id="app">
    <nav v-if="!!anonymous" id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <MainHead v-else @onLogout="onLogout" />
    <div id="content">
      <router-view />
    </div>
    <footer v-if="!anonymous">
      <MainNav />
    </footer>
  </div>
</template>
<script>
import Firebase from "firebase";
import MainHead from "@/components/layout/MainHead.vue";
import MainNav from "@/components/layout/MainNav.vue";

export default {
  components: {
    MainHead,
    MainNav
  },
  data: function() {
    return {
      anonymous: true
    };
  },
  methods: {
    onLogout: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Home" });
        });
    }
  },
  mounted: function() {
    this.anonymous = !Firebase.auth().currentUser;
    Firebase.auth().onAuthStateChanged(user => {
      this.anonymous = !user;
    });
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Red+Hat+Display&display=swap");
#app {
  font-family: "Red Hat Display", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#content {
  padding-bottom: 60px;
  h2 {
    margin-top: 0.75em;
  }
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

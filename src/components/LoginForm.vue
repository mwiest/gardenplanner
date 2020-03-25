<template>
    <b-form @submit="onSubmit" class="loginform">
        <b-form-group
            id="input-group-1"
            label="Email:"
            label-for="input-1"
            >
            <b-form-input
                id="input-1"
                v-model="loginForm.email"
                type="email"
                required
                placeholder="john@doe.com"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-1"
            label="Password:"
            label-for="input-2"
            >
            <b-form-input
                id="input-2"
                v-model="loginForm.password"
                type="password"
                required
            ></b-form-input>
        </b-form-group>

        <b-button block variant="primary" class="mt-4">Login</b-button>
    </b-form>
</template>

<script>
export default {
  name: "LoginForm",
  data: function(){ 
    return {
      loginForm: {}
    }
  },
  methods: {
      onSubmit: function() {
          console.log("submit");
      }
  }
};
</script>

<style lang="scss">
.loginform {
    text-align: left;
}
</style>
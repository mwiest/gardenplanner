<template>
  <b-form @submit.stop.prevent="onSubmit" class="loginform" novalidate>
    <b-alert v-if="!!errorMessage" variant="danger" show="!!errorMessage">{{
      errorMessage
    }}</b-alert>
    <b-form-group
      label="E-Mail:"
      invalid-feedback="Bitte gib deine E-Mail-Adresse an."
      :state="emailState"
    >
      <b-form-input
        v-model="loginForm.email"
        type="email"
        placeholder="max@muster.net"
        :state="emailState"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Passwort:"
      invalid-feedback="Bitte gib dein Passwort an."
      :state="passwordState"
    >
      <b-form-input
        v-model="loginForm.password"
        type="password"
        autocomplete="current-password"
        :state="passwordState"
      ></b-form-input>
    </b-form-group>

    <b-button block type="submit" variant="primary" class="mt-4"
      >Login</b-button
    >
  </b-form>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    errorMessage: String
  },
  data: function() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      validated: false,
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  methods: {
    validate: function() {
      this.validated = true;
      return this.emailState !== false && this.passwordState !== false;
    },
    onSubmit: function() {
      if (this.validate()) {
        this.$emit("login", this.loginForm);
      }
    }
  },
  computed: {
    emailState: function() {
      return this.validated && !this.reg.test(this.loginForm.email)
        ? false
        : null;
    },
    passwordState: function() {
      return this.validated && !this.loginForm.password ? false : null;
    }
  }
};
</script>

<style lang="scss">
.loginform {
  text-align: left;
}
</style>

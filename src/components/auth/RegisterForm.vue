<template>
  <b-form @submit.prevent="onSubmit" class="registerform">
    <b-alert v-if="!!errorMessage" variant="danger" show="!!errorMessage">{{
      errorMessage
    }}</b-alert>
    <b-form-group
      label="Name:"
      invalid-feedback="Bitte gib deinen Namen an."
      :state="nameState"
    >
      <b-form-input
        v-model="registerForm.name"
        type="text"
        placeholder="Max"
        :state="nameState"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="E-Mail:"
      invalid-feedback="Bitte gib deine E-Mail-Adresse an."
      :state="emailState"
    >
      <b-form-input
        v-model="registerForm.email"
        type="email"
        placeholder="max@muster.net"
        :state="emailState"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Passwort:"
      invalid-feedback="Bitte wähle ein Passwort."
      :state="passwordState"
    >
      <b-form-input
        v-model="registerForm.password"
        type="password"
        :state="passwordState"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      description="Deine Daten werden ausschliesslich für die Identifikation deines Accounts im Gartenplaner verwendet und niemals an Dritte weitergegeben."
    >
      <b-button block type="submit" variant="primary" class="mt-4"
        >Registrieren</b-button
      >
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: "RegisterForm",
  props: {
    errorMessage: String
  },
  data: function() {
    return {
      registerForm: {
        name: "",
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
      return (
        this.nameState !== false &&
        this.emailState !== false &&
        this.passwordState !== false
      );
    },
    onSubmit: function() {
      if (this.validate()) {
        this.$emit("register", this.registerForm);
      }
    }
  },
  computed: {
    nameState: function() {
      return this.validated && !this.registerForm.name ? false : null;
    },
    emailState: function() {
      return this.validated && !this.reg.test(this.registerForm.email)
        ? false
        : null;
    },
    passwordState: function() {
      return this.validated && !this.registerForm.password ? false : null;
    }
  }
};
</script>

<style lang="scss">
.registerform {
  text-align: left;
}
</style>

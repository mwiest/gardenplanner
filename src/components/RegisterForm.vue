<template>
    <b-form @submit="onSubmit" class="registerform">
        <b-form-group
            id="reg-group-1"
            label="Name:"
            label-for="reginput-1"
            >
            <b-form-input
                id="reginput-1"
                v-model="registerForm.email"
                type="text"
                required
                placeholder="John"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="reg-group-2"
            label="Email:"
            label-for="reginput-2"
            >
            <b-form-input
                id="reginput-2"
                v-model="registerForm.email"
                type="email"
                required
                placeholder="john@doe.com"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="reg-group-3"
            label="Password:"
            label-for="reginput-3"
            >
            <b-form-input
                id="reginput-3"
                v-model="registerForm.password"
                type="password"
                required
            ></b-form-input>
        </b-form-group>

        <b-form-group
                description="We're not giving your data to anyone. By registering you agree to the terms of service."
                >
            <b-button block variant="primary" class="mt-4">Sign up</b-button>
        </b-form-group>
    </b-form>
</template>

<script>
export default {
  name: "RegisterForm",
  data: function(){ 
    return {
      registerForm: {}
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
.registerform {
    text-align: left;
}
</style>
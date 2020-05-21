<template>
  <div class="home">
    <b-container fluid>
      <img alt="Logo" src="@/assets/logo.png" />
      <h1>Gartenplaner</h1>
      <p class="mb-3">
        Bleibe stets informiert über was es in deinem Garten zu tun gibt.
      </p>
      <b-row>
        <b-col
          class="text-center"
          sm="8"
          offset-sm="2"
          md="6"
          offset-md="3"
          lg="4"
          offset-lg="4"
        >
          <b-tabs
            active-nav-item-class="tab-active"
            content-class="mt-3"
            align="center"
          >
            <b-tab title="Login" active>
              <LoginForm @login="onLogin" :errorMessage="loginError" />
            </b-tab>
            <b-tab title="Register">
              <RegisterForm
                @register="onRegister"
                :errorMessage="registerError"
              />
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import Firebase from "firebase";

export default {
  name: "Home",
  components: {
    LoginForm,
    RegisterForm
  },
  data: function() {
    return {
      loginError: "",
      registerError: ""
    };
  },
  methods: {
    onLogin: function(loginForm) {
      Firebase.auth()
        .signInWithEmailAndPassword(loginForm.email, loginForm.password)
        .then(() => {
          this.$router.replace({ name: "Garden" });
        })
        .catch(err => {
          this.loginError = err.message;
        });
    },
    onRegister: function(registerForm) {
      Firebase.auth()
        .createUserWithEmailAndPassword(
          registerForm.email,
          registerForm.password
        )
        .then(() => {
          alert("Konto erstellt!");
          Firebase.auth().currentUser.updateProfile({
            displayName: registerForm.name
          });
          this.$router.replace({ name: "Garden" });
        })
        .catch(err => {
          this.registerError = err.message;
        });
    }
  }
};
</script>

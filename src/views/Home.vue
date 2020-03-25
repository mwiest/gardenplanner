<template>
  <div class="home">
    <b-container fluid>
      <img alt="Logo" src="../assets/logo.png" />
      <h1>Garden Planner</h1>
      <p class="mb-3">Keep track of the different plants in your garden and the tasks to do for each of them.</p>

      <b-row>
        <b-col class="text-center" sm="8" offset-sm="2" md="6" offset-md="3" lg="4" offset-lg="4">
          <b-tabs
            active-nav-item-class="tab-active"
            content-class="mt-3"
            align="center"
          >
            <b-tab title="Register" active>
              <RegisterForm/>
            </b-tab>
            <b-tab title="Login">
              <LoginForm/>
            </b-tab>
          </b-tabs>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Home",
  components: {
    LoginForm,
    RegisterForm
  },
  data: function(){ 
    return {
      register: false
    }
  }
};
</script>

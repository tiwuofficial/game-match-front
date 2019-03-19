<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Login</h1>
    <div class="text-xs-center" v-if="wait">
      <v-progress-circular
              :size="50"
              color="success"
              indeterminate
      ></v-progress-circular>
    </div>
    <v-form v-if="!wait">
      <v-text-field
        v-model="userId"
        label="User ID"
        type="text"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn @click="submit" outline block color="success">Login</v-btn>
    <v-btn to="/register" outline block class="mt-4">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Top extends Vue {
      private userId: string = '';
      private password: string = '';
      private wait:boolean = false;
      private submit() {
          this.wait = true;
        const formData = new FormData();
        formData.append('user_id', this.userId);
        formData.append('password', this.password);
        fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/login`, {
            method: "POST",
            body: formData,
        }).then(response => response.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
              if (response.access_token) {
                localStorage.setItem('access_token', response.access_token);
                this.$router.push('home');
              }
          });
      }
    }
</script>

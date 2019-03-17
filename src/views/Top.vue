<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Login</h1>
    <v-form>
      <v-text-field
        v-model="id"
        label="ID"
        type="text"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn @click="submit">Login</v-btn>
    </v-form>
    <router-link to="/register">Register</router-link>
  </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Top extends Vue {
      private id: string = '';
      private password: string = '';
      private submit() {
        const formData = new FormData();
        formData.append('id', this.id);
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

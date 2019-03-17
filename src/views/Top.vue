<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Login</h1>
    <v-form>
      <v-text-field
        v-model="email"
        label="E-mail"
        type="email"
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
      private email: string = '';
      private password: string = '';
      private submit() {
        // api叩いてログインできれば遷移
        this.$router.push('home');
      }
    }
</script>

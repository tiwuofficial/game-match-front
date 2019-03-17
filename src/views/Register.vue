<template>
  <section>
    <h1>Register</h1>
    <v-form>
      <v-text-field
        v-model="id"
        label="ID"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn @click="submit">Register</v-btn>
    </v-form>
  </section>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Top extends Vue {
      private id: string = '';
      private password: string = '';
      private submit() {
        // api叩いて登録できれば遷移
        this.$router.push('home');
      }
    }
</script>

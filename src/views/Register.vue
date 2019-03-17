<template>
  <v-container
          fluid
          grid-list-md
  >
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
      <v-textarea
        box
        v-model="introduction"
        label="Introduction"
        value=""
        required
      ></v-textarea>
      <v-btn @click="submit">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Top extends Vue {
      private id: string = '';
      private password: string = '';
      private introduction:string = '';
      private submit() {
        // api叩いて登録できれば遷移
          const formData = new FormData();
          formData.append('id', this.id);
          formData.append('password', this.password);
          formData.append('introduction', this.introduction);
          fetch('http://localhost:8080/api/register', {
              method: "POST",
              body: formData,
          }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response && response.access_token) {
                    localStorage.setItem('access_token', response.access_token);
                    this.$router.push('home');
                }
            });
      }
    }
</script>

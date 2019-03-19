<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Register</h1>
    <div class="text-xs-center" v-if="wait">
      <v-progress-circular
              :size="50"
              color="success"
              indeterminate
      ></v-progress-circular>
    </div>
    <v-form v-if="!wait">
      <v-text-field
        v-model="user_id"
        label="User ID"
        required
        :rules="idRule"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-textarea
        v-model="introduction"
        label="Introduction"
        value=""
        required
      ></v-textarea>
      <v-btn @click="submit" outline block color="success">Register</v-btn>
      <v-btn to="/" outline block class="mt-4">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Top extends Vue {
      private user_id: string = '';
      private password: string = '';
      private introduction:string = '';
      private wait:boolean = false;
      private submit() {
          this.wait = true;
        // api叩いて登録できれば遷移
          const formData = new FormData();
          formData.append('user_id', this.user_id);
          formData.append('password', this.password);
          formData.append('introduction', this.introduction);
          fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/register`, {
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
      /** computed */
      get idRule(): string[] {
          const rules: string[] = [];
          if(!this.user_id.match(/^[A-Za-z0-9]*$/)){
              rules.push('半角英数字のみ入力してください');
          }
          return rules;
      }
    }
</script>

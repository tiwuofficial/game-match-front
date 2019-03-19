<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Edit</h1>
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
      <v-textarea
        v-model="introduction"
        label="Introduction"
        value=""
        required
      ></v-textarea>
      <v-btn @click="submit" outline block color="success"
             :loading="loading"
             :disabled="loading"
      >Update</v-btn>
      <p v-if="success">Success!</p>
    </v-form>
    <BottomNav></BottomNav>
  </v-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import BottomNav from "@/components/BottomNav.vue";

    @Component({
        components: {
            BottomNav,
        },
    })
    export default class Edit extends Vue {
      private user_id: string = '';
      private introduction:string = '';
      private wait:boolean = true;
      private loading:boolean = false;
      private success:boolean = false;
      public created(){
          fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/me`, {
              mode: "cors",
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
              },
              credentials: 'include',
          }).then(response => response.json())
              .catch(error => console.error('Error:', error))
              .then(response => {
                  if (response) {
                      this.user_id = response.userId;
                      this.introduction = response.introduction;
                  }
                  this.wait = false;
              });
      }
      private submit() {
          this.loading = true;
          this.success = false;
        // api叩いて登録できれば遷移
          const formData = new FormData();
          formData.append('user_id', this.user_id);
          formData.append('introduction', this.introduction);
          formData.append('_method', 'PUT');
          fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/users/edit`, {
              method: "POST",
              body: formData,
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
              },
          }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response) {
                    this.loading = false;
                    this.success = true;
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

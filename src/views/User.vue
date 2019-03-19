<template>
  <v-container
          fluid
          grid-list-md
  >
    <div class="text-xs-center" v-if="wait">
      <v-progress-circular
              :size="50"
              color="success"
              indeterminate
      ></v-progress-circular>
    </div>
    <h1>{{user.userId}}</h1>
    <p>{{user.introduction}}</p>
    <v-btn @click="submit"
           outline
           block
           color="success"
           :loading="loading"
           :disabled="loading"
           v-if="!buttonHidden && !wait && !isFriend && !isRequest"
    >Friend Request</v-btn>
    <p v-if="buttonHidden && !wait">Friend Request Done! Thank!</p>
    <p v-if="isFriend && !wait">Friend !</p>
    <p v-if="isRequest && !wait">Friend Request Sended !</p>
    <BottomNav></BottomNav>
  </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import BottomNav from "@/components/BottomNav.vue";

    @Component({
        components: {
            BottomNav,
        },
    })
    export default class User extends Vue {
        private user:object = {};
        private loading:boolean = false;
        private buttonHidden:boolean = false;
        private wait:boolean = true;
        private isFriend:boolean = false;
        private isRequest:boolean = false;
        public created(){
            fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/users/${this.$route.params.id}`, {
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            }).then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response) {
                        this.user = response;
                        this.isFriend = response.isFriend;
                        this.isRequest = response.isRequest;
                    }
                    this.wait = false;
                });
        }
        private submit() {
            this.loading = true;
            const formData = new FormData();
            formData.append('to_id', this.$route.params.id);
            fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/requests`, {
                method: "POST",
                body: formData,
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            }).then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                        console.log(response);
                        this.buttonHidden = true;
                    if (response && response.result) {
                    }
                });
        }
    }
</script>

<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Notifications</h1>
    <div class="text-xs-center" v-if="wait">
      <v-progress-circular
              :size="50"
              color="success"
              indeterminate
      ></v-progress-circular>
    </div>
    <v-layout row wrap class="mb-5">
      <v-flex
              xs12
              v-for="user in users"
              :key="user.id"
      >
        <v-card>
          <v-card-title>
            <router-link :to="`/user/${user.user_id}`">
              <h3>{{user.user_id}}</h3>
            </router-link>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="approval(user.id)" outline color="success"
                   :loading="user.applovalLoading"
                   :disabled="user.rejectionLoading || user.applovalLoading"
                   v-if="user.buttonDisplay"
            >Approval</v-btn>
            <v-btn @click="rejection(user.id)" outline color="error"
                   :loading="user.rejectionLoading"
                   :disabled="user.rejectionLoading || user.applovalLoading"
                   v-if="user.buttonDisplay"
            >Rejection</v-btn>
            <p v-if="user.success">Success!</p>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
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
    export default class Notifications extends Vue {
        private users:object[] = [];
        private wait:boolean = true;
        public created() {
            fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/requests`, {
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                },
                credentials: 'include',
            }).then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    console.log(response);
                    if (response) {
                        this.users = response.map((res:any) => {
                            res.buttonDisplay = true;
                            return res;
                        });
                    }
                    this.wait = false;
                });
        }
        private approval(id:string) {
            const user:any = this.users.filter((user:any) => {
                return user.id === id;
            }).shift();
            user.applovalLoading = true;
            this.users.splice(this.users.indexOf(user), 1, user);
            const formData = new FormData();
            formData.append('id', id);
            fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/approval`, {
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
                    if (response && response.result) {
                    }
                    const user:any = this.users.filter((user:any) => {
                        return user.id === id;
                    }).shift();
                    user.success = true;
                    user.buttonDisplay = false;
                    this.users.splice(this.users.indexOf(user), 1, user);
                });
        }
        private rejection(id:string) {
            const user:any = this.users.filter((user:any) => {
                return user.id === id;
            }).shift();
            user.rejectionLoading = true;
            this.users.splice(this.users.indexOf(user), 1, user);
            const formData = new FormData();
            formData.append('id', id);
            fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/rejection`, {
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
                    if (response && response.result) {
                    }
                    const user:any = this.users.filter((user:any) => {
                        return user.id === id;
                    }).shift();
                    user.success = true;
                    user.buttonDisplay = false;
                    this.users.splice(this.users.indexOf(user), 1, user);
                });
        }
    }
</script>

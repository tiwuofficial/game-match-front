<template>
  <v-container
    fluid
    grid-list-md
  >
    <h1>Home</h1>
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
        <v-card
          :to="`/user/${user.user_id}`"
        >
          <v-card-title>
            <div>
              <h3>{{user.user_id}}</h3>
            </div>
          </v-card-title>
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
    export default class Home extends Vue {
      private users:object[] = [];
      private wait:boolean = true;
      public created(){
          fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/users`, {
              mode: "cors",
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
              },
              credentials: 'include',
          }).then(response => response.json())
              .catch(error => console.error('Error:', error))
              .then(response => {
                  if (response) {
                      this.users = response;
                  }
                  this.wait = false;
              });
      }
    }
</script>

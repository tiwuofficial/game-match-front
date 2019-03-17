<template>
    <v-container
            fluid
            grid-list-md
    >
      <h1>Home</h1>
        <v-layout row wrap>
          <v-flex
                  xs6
                  v-for="card in cards"
                  :key="card.id"
          >
            <v-card
                    :to="`/user/${card.id}`"
            >
              <v-img
                      :src="card.src"
                      height="150px"
              >
              </v-img>
              <v-card-title>
                <div>
                  <h3>{{card.id}}</h3>
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
      private cards:object[] = [];
      // TODO 自分以外のユーザーを取得
      public created(){
          fetch('http://localhost:8080/api/users', {
              mode: "cors",
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
              },
              credentials: 'include',
          }).then(response => response.json())
              .catch(error => console.error('Error:', error))
              .then(response => {
                  if (response) {
                      this.cards = response;
                  }
              });
      }
    }
</script>

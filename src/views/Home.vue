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
                  <h3>{{card.title}}</h3>
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
      private cards:object[] = [
        { id: 1, title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { id: 2,title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { id: 3,title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ];
    }
</script>

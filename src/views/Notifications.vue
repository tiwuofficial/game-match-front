<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Notifications</h1>
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
        // TODO 友達許可
        // TODO 友達拒否
    }
</script>

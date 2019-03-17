<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Friends</h1>
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
    export default class Friends extends Vue {
    }
</script>

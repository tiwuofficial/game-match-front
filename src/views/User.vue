<template>
  <section>
    <v-container
            fluid
            grid-list-md
    >
    <h1>User</h1>
    </v-container>
    <BottomNav></BottomNav>
  </section>
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
    }
</script>

<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>Settings</h1>
    <p class="title mt-3" @click="me">My Page</p>
    <p class="title" @click="edit">Edit</p>
    <p class="title" @click="logout">Logout</p>
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
    export default class Settings extends Vue {
        public created() {

        }

        private logout() {
            localStorage.setItem('access_token', '');
            this.$router.push('/');
        }

        private me() {
            this.$router.push('/me');
        }

        private edit() {
            this.$router.push('/edit');
        }
    }
</script>

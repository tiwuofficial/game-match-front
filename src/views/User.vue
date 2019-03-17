<template>
  <v-container
          fluid
          grid-list-md
  >
    <h1>{{user.user_id}}</h1>
    <p>{{user.introduction}}</p>
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
        public created(){
            console.log(process.env.VUE_APP_BACK_ORIGIN);
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
                    }
                });
        }
    }
</script>

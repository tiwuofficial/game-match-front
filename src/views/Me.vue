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
    export default class Me extends Vue {
        private user:object = {};
        private wait:boolean = true;
        public created(){
            fetch(`${process.env.VUE_APP_BACK_ORIGIN}/api/me`, {
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
                    this.wait = false;
                });
        }
    }
</script>

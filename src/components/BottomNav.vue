<template>
  <v-bottom-nav
          :active.sync="bottomNav"
          :value="true"
          fixed
          color="#fff"
  >
    <v-btn
            color="teal"
            flat
            value="home"
            to="/home"
    >
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>

    <v-btn
            color="teal"
            flat
            value="friends"
            to="/friends"
    >
      <span>Friends</span>
      <v-icon>people</v-icon>
    </v-btn>

    <v-btn
            color="teal"
            flat
            value="notifications"
            to="/notifications"
    >
      <span>Notifications</span>
      <v-icon>notifications</v-icon>
    </v-btn>

    <v-btn
            color="teal"
            flat
            value="settings"
            to="/settings"
    >
      <span>Settings</span>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class BottomNav extends Vue {
        private bottomNav: string = '';
    }
</script>

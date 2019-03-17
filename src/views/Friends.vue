<template>
  <section>
    <h1>Friends</h1>
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
    export default class Friends extends Vue {
    }
</script>

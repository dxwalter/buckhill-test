<template>
<v-app>
  <NavigationBar />
  <v-main>
    <v-container>
      Hello World
    </v-container>
  </v-main>
</v-app>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import NavigationBar from '@/layouts/NavigationBar.vue'
    @Component({
      components: {
        NavigationBar
      }
    })
    export default class App extends Vue {
        
    };
</script>

<style scoped>

</style>
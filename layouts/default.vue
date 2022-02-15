<template>
  <v-app ref="app">
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'nuxt-property-decorator'
    @Component({})
    export default class DefaultLayout extends Vue {
      $vuetify: any
      
      @Watch('$vuetify.theme.isDark', { immediate: true, deep: true }) SetWhiteBackground() {
        if (process.browser) {
          this.$vuetify.theme.isDark = false
        }
      }
    };
</script>
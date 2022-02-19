<template>
  <div class="spin-loader">
    <div class="content-loader">
      <div class="loader-action">
        <span class="loader"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PageLoader extends Vue {}
</script>

<style scoped>
.spin-loader {
  height: calc(100vh - 50px);
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  /* border: 2px solid green; */
  width: 50px;
  height: 50px;
}
</style>
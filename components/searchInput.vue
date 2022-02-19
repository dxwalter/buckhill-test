<template>
    <div class="search-box-container mt-4 mb-4">
    <v-text-field
        outlined
        label="Search products"
        color="green"
        prepend-inner-icon="mdi-magnify"
    ></v-text-field>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SearchInput extends Vue {}
</script>
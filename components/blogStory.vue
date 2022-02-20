<template>
    <div class="blog-header-banner order-page">
        <div class="blog-image-area">
            <img src="/images/blog.jpg" alt="" srcset="">
        </div>
        <div class="blog-action-area">
            <div class="blog-tite">In ac felis quis tortor</div>
            <NuxtLink to="#" class="blog-link">Discover our dog treatment selection</NuxtLink>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PromotionBanner extends Vue {}
</script>

<style scoped>
.order-page {
    order: 2;
}
</style>
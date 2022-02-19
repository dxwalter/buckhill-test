<template>
    <div>
        <div class="products-category-header">Category Name</div>
        <VueSlickCarousel v-bind="settings">
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="card product-card">
                <div class="product-image-area">
                    <img src="/images/demo.jpg" alt="" srcset="">
                </div>
                <div>
                    <NuxtLink to="#" class="product-name">Product name</NuxtLink>
                    <div class="product-brand-name">Brand</div>
                    <div class="product-price">Price</div>
                </div>
            </div>
        </div>
        </VueSlickCarousel>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

@Component({
    components:{
        VueSlickCarousel
    }
})
export default class PromotionBanner extends Vue {
    settings = {
        "dots": false,
        "arrows": true,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 4,
        "slidesToScroll": 4,
        "initialSlide": 0,
        "responsive": [
            {
            "breakpoint": 1024,
            "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 3,
                "infinite": true,
                "dots": true
            }
            },
            {
            "breakpoint": 600,
            "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2,
                "initialSlide": 2
            }
            },
            {
            "breakpoint": 480,
            "settings": {
                "slidesToShow": 1,
                "slidesToScroll": 1
            }
            }
        ]
    }
}
</script>
<style scoped>

</style>
<template>
    <div v-if="allProduct.length">
        <div class="products-category-header">{{ categoryName }}</div>
        <VueSlickCarousel v-bind="settings">
        <div v-for="product in allProduct" :key="product.uuid" class="item">
            <div class="card product-card">
                <product-image
                    :image-data="{
                        productId: product.uuid,
                        imageId: product.metadata.image
                    }"
                 />
                <div>
                    <NuxtLink to="#" class="product-name" :title="product.title">{{ product.title }}</NuxtLink>
                    <div class="product-brand-name">{{ product.brand.title }}</div>
                    <div class="product-price">{{ product.price }} Kn</div>
                </div>
            </div>
        </div>
        </VueSlickCarousel>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

import { SliderProduct, Product } from '../types'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

@Component({
    components:{
        VueSlickCarousel
    }
})
export default class ProductSlider extends Vue {

    @Prop({ required: false, type: Object, default: {} })
    productListing!: {};

    categoryName: string = '';
    allProduct: Product[] = []

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

    @Watch('productListing', { immediate: true, deep: true }) checkRecipient(newVal: SliderProduct) {
        this.categoryName = newVal.categoryName
        this.allProduct = newVal.products
    }
}
</script>
<style scoped>

</style>
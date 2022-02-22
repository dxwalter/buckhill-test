<template>
    <div class="item">
            <div class="card product-card">
                <product-image
                    :image-data="{
                        productId: product.uuid,
                        imageId: product.metadata.image
                    }"
                 />
                <div>
                    <NuxtLink :to="`/product/${product.uuid}`" class="product-name" :title="product.title">{{ product.title }}</NuxtLink>
                    <div class="product-brand-name">{{ product.brand.title }}</div>
                    <div class="product-price" :class="[showCartBtn ? 'bolden-price' : '']">{{ product.price }} Kn</div>
                </div>
                <div v-if="showCartBtn" class="mt-2 neg-mg-8">
                        <v-btn
                            color="green    "
                            class="ma-2 white--text"
                        >
                            <v-icon left dark> mdi-cart </v-icon>
                            ADD TO CART
                        </v-btn>
                </div>
            </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { Product } from '../types'
@Component
export default class ProductItem extends Vue {
    @Prop({ required: false, type: Object, default: {} })
    productItem!: {};

    @Prop({ required: false, type: Boolean, default: false })
    showCartBtn!: false;

    product: Product = {
        category_uuid: '',
        title: '',
        uuid: '',
        price: 0,
        description: '',
        metadata: {
            brand: '',
            image: ''
        },
        created_at: '',
        updated_at: '',
        deleted_at: null,
        category: {
            uuid: '',
            title: '',
            slug: '',
            created_at: '',
            updated_at: '',
        },
        brand: {
            uuid: '',
            title: '',
            slug: '',
            created_at: '',
            updated_at: '',
        }
    }

    @Watch('productItem', { immediate: true, deep: true }) setUpToken(newVal: Product) {
        this.product = newVal
    }
}
</script>
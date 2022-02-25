<template>
  <div class="item">
    <div class="card product-card">
      <product-image
        :image-data="{
          productId: product.uuid,
          imageId: product.metadata.image,
        }"
      />
      <div>
        <NuxtLink
          :to="`/product/${product.uuid}`"
          class="product-name"
          :title="product.title"
          >{{ $capitalizeString(product.title) }}</NuxtLink
        >
        <div class="product-brand-name">
          {{ $capitalizeString(product.brand.title) }}
        </div>
        <div class="product-price" :class="[showCartBtn ? 'bolden-price' : '']">
          {{ product.price }} Kn
        </div>
      </div>
      <div v-if="showCartBtn && !itemExistStatus" class="mt-2 neg-mg-8">
        <v-btn color="green    " class="ma-2 white--text" @click="addToCart">
          <v-icon left dark> mdi-cart </v-icon>
          ADD TO CART
        </v-btn>
      </div>

      <div v-if="showCartBtn && itemExistStatus" class="mt-2 neg-mg-8">
        <v-btn
          color="orange"
          class="ma-2 white--text"
          outlined
          @click="removeFromCart"
        >
          <v-icon left dark> mdi-cart-off </v-icon>
          REMOVE FROM CART
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { Product, CartItem } from '../types'
@Component
export default class ProductItem extends Vue {
  @Prop({ required: false, type: Object, default: {} })
  productItem!: {}

  @Prop({ required: false, type: Boolean, default: false })
  showCartBtn!: false

  product: Product = {
    category_uuid: '',
    title: '',
    uuid: '',
    price: 0,
    description: '',
    metadata: {
      brand: '',
      image: '',
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
    },
  }

  $toast: any

  itemExistStatus: number = 0

  itemExistsInCart(): void {
    const getAllCart: CartItem[] = this.$store.getters['cart/getAllCart']

    const item: CartItem[] = getAllCart.filter(
      (item) => item.uuid === this.product.uuid
    )

    this.itemExistStatus = item.length
  }

  addToCart(): void {
    const cartData: CartItem = {
      category_uuid: this.product.category_uuid,
      title: this.product.title,
      uuid: this.product.uuid,
      price: this.product.price,
      description: this.product.description,
      metadata: {
        brand: this.product.brand.title,
        image: this.product.metadata.image,
      },
      quantity: 1,
    }

    this.$store.dispatch('cart/addToCart', cartData)

    // this.$toast.success('Item added to cart');
    this.itemExistStatus = 1
  }

  removeFromCart(): void {
    this.$store.dispatch('cart/removeCartItem', this.product.uuid)
    this.itemExistStatus = 0
  }

  @Watch('productItem', { immediate: true, deep: true }) setUpToken(
    newVal: Product
  ) {
    this.product = newVal
    this.itemExistsInCart()
  }
}
</script>

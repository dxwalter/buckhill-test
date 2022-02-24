<template>
  <div class="cart-item-container">
    <v-card elevation="3" class="mr-10">
      <div class="cart-image">
        <img :id="`cartImage${productId}`" :src="imageSrc" alt="" srcset="" />
      </div>
    </v-card>
    <div class="cart-item-details">
      <div class="name">{{ productData.title }}</div>
      <div class="brand">{{ productData.metadata.brand }}</div>
      <div class="price">{{ getPriceByQuantity }} KN</div>
      <div class="actions d-flex">
        <div class="d-flex">
          <v-btn depressed @click="reduceQuantity"> - </v-btn>
          <input v-model="quantity" type="text" class="cart-item-quantity" />
          <v-btn depressed @click="quantity++"> + </v-btn>
        </div>
        <v-btn
          color="orange"
          class="ml-4 white--text"
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
import { Debounce } from 'vue-debounce-decorator'
import { getImageStatus, CartItem } from '../types'

@Component
export default class CartLisingItem extends Vue {
  @Prop({ required: true, type: Object, default: {} })
  cartData!: {}

  productId: string = ''
  quantity: number = 1
  $toast: any
  imageSrc: string | undefined = ''

  productData: CartItem = {
    category_uuid: '',
    title: '',
    uuid: '',
    description: '',
    price: 0,
    metadata: {
      brand: '',
      image: '',
    },
    quantity: 1,
  }

  get getPriceByQuantity() {
    this.updateCartQuantity()
    return (Number(this.productData.price) * Number(this.quantity)).toFixed(2)
  }

  removeFromCart(): void {
    this.$store.dispatch('cart/removeCartItem', this.productId)
  }

  @Debounce(500)
  updateCartQuantity(): void {
    const newData = JSON.parse(JSON.stringify(this.productData))
    newData.quantity = Number(this.quantity)
    this.$store.dispatch('cart/updateCartQuantity', newData)
  }

  reduceQuantity(): void {
    this.quantity = Number(this.quantity) === 1 ? 1 : Number(this.quantity) - 1
  }

  async getImageFile(uuid: string) {
    const getImage: getImageStatus = await this.$getImageFIle(
      uuid,
      `cartImage${this.productId}`
    )
    if (!getImage.status) {
      this.$toast.error(getImage.message)
    } else {
      this.imageSrc = getImage.src
    }
  }

  @Watch('cartData', { immediate: true, deep: true }) setCartItem(
    newVal: CartItem
  ) {
    this.productData = newVal
    this.productId = newVal.uuid
    this.quantity = newVal.quantity
    this.getImageFile(newVal.metadata.image)
  }
}
</script>

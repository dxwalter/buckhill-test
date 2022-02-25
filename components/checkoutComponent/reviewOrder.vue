<template>
  <div class="checkout-item-container">
    <div class="tab-header">Review your order</div>

    <!-- Shipping address -->
    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Shipping address</div>
        <div class="switch-tab" @click="moveToPrevious('1')">Edit</div>
      </div>
      <div class="more-details">
        <div class="">{{ reviewData.details.customer.address_line_one }}</div>
        <div class="">{{ reviewData.details.customer.address_line_two }}</div>
        <div class="">{{ reviewData.details.customer.postal_code }}</div>
        <div class="">{{ reviewData.details.customer.city }}</div>
        <div class="">{{ reviewData.details.customer.state }}</div>
        <div class="">{{ reviewData.details.customer.country }}</div>
      </div>
    </div>

    <!-- Payment address -->
    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Payment details</div>
        <div class="switch-tab" @click="moveToPrevious('2')">Edit</div>
      </div>
      <div class="more-details mb-3">
        <div class="">
          {{ reviewData.details.customer.first_name }}
          {{ reviewData.details.customer.last_name }}
        </div>
        <div class="">{{ reviewData.details.customer.address_line_one }}</div>
        <div class="">{{ reviewData.details.customer.address_line_two }}</div>
        <div class="">{{ reviewData.details.customer.postal_code }}</div>
        <div class="">{{ reviewData.details.customer.city }}</div>
        <div class="">{{ reviewData.details.customer.state }}</div>
        <div class="">{{ reviewData.details.customer.country }}</div>
      </div>
      <v-divider class="mb-3"></v-divider>
      <div class="more-details">
        <div class="">Type of payment</div>
        <div class="">{{ $capitalizeString(paymentMethod) }}</div>
      </div>
    </div>

    <!-- ordered items -->
    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Your order</div>
        <div class="switch-tab"><NuxtLink to="/cart">Edit</NuxtLink></div>
      </div>
      <div class="">
        <div
          v-for="item in allCartItems"
          :key="item.uuid"
          class="summary-ordered-item"
        >
          <div class="image-area">
            <img :id="`cartImage${item.uuid}`" src="" alt="" srcset="" />
          </div>
          <div class="summary-info">
            <div class="name">
              {{ $capitalizeString(item.title) }}
            </div>
            <div class="description">
              {{ $capitalizeString(item.brand) }}
            </div>
            <div class="price">{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->

    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Summary</div>
      </div>
      <div class="more-details gray">
        <div class="d-flex justify-space-between">
          <div>Subtotal before delivery</div>
          <div>400,00KN</div>
        </div>
        <div class="d-flex justify-space-between">
          <div>Delivery charge</div>
          <div>400,00KN</div>
        </div>
      </div>
      <v-divider class="mb-3"></v-divider>
      <div class="total-price d-flex justify-space-between">
        <div>Total</div>
        <div>{{ totalCartAmount }}KN</div>
      </div>
    </div>

    <div class="mt-16 mb-16">
      <v-btn
        id="initiateLogin"
        color="green"
        class="btn-100"
        dark
        large
        full
        type="submit"
      >
        PLACE ORDER
        <btn-loader />
      </v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { CartItem, getImageStatus } from '../../types'

@Component
export default class ReviewYourOrder extends Vue {
  @Prop({ required: true, type: Object, default: {} })
  reviewData!: {}

  $toast: any
  imageSrc: string | undefined = ''

  paymentMethod: string = ''

  moveToPrevious(tab: string) {
    this.$emit('move-to-previous', tab)
  }

  totalCartAmount: number = 0

  get allCartItems() {
    return this.$store.getters['cart/getAllCart']
  }

  async getImageFile(uuid: string, productId: string) {
    const getImage: getImageStatus = await this.$getImageFIle(
      uuid,
      `cartImage${productId}`
    )
    if (!getImage.status) {
      this.$toast.error(getImage.message)
    } else {
      this.imageSrc = getImage.src
    }
  }

  calculateTotalPrice() {
    let totalCartAmount = 0

    this.allCartItems.forEach((data: CartItem) => {
      totalCartAmount =
        totalCartAmount + Number(data.price) * Number(data.quantity)
    })

    this.totalCartAmount = Number(totalCartAmount.toFixed(2))
  }

  displayImages(): void {
    this.allCartItems.forEach(async (data: CartItem) => {
      await this.getImageFile(data.metadata.image, data.uuid)
    })
  }

  created() {
    this.displayImages()
    this.calculateTotalPrice()
  }

  @Watch('reviewData', { immediate: true, deep: true }) setForPayment(
    newVal: any
  ) {
    console.log(newVal)
    this.paymentMethod = newVal.type.replaceAll('_', ' ')
  }
}
</script>

<style scoped>
.order-page {
  order: 2;
}
</style>

<template>
  <div class="checkout-item-container">
    <div class="tab-header">Review your order</div>

    <!-- Shipping address -->
    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Shipping address</div>
        <div class="switch-tab">Edit</div>
      </div>
      <div class="more-details">
        <div class="">First aname ewrwe e rwerw</div>
        <div class="">Address line q</div>
        <div class="">Address line q</div>
        <div class="">City</div>
        <div class="">CityZip p</div>
      </div>
    </div>

    <!-- Payment address -->
    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Payment details</div>
        <div class="switch-tab">Edit</div>
      </div>
      <div class="more-details mb-3">
        <div class="">First aname ewrwe e rwerw</div>
        <div class="">Address line q</div>
        <div class="">Address line q</div>
        <div class="">City</div>
        <div class="">CityZip p</div>
      </div>
      <v-divider class="mb-3"></v-divider>
      <div class="more-details">
        <div class="">First aname ewrwe e rwerw</div>
        <div class="">Address line q</div>
      </div>
    </div>

    <!-- ordered items -->
    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Your order</div>
        <div class="switch-tab"><NuxtLink to="/cart">Edit</NuxtLink></div>
      </div>
      <div class="">
        <div class="summary-ordered-item">
          <div class="image-area">
            <img src="/images/5.jpg" alt="" srcset="" />
          </div>
          <div>
            <div>Name</div>
            <div>Description</div>
            <div>Price</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->

    <div class="mb-8">
      <div class="review-section-header d-flex justify-space-between">
        <div class="header">Summary</div>
      </div>
      <div class="more-details">
        <div class="d-flex justify-space-between">
          <div>Subtotal before delivery</div>
          <div>400,00KN</div>
        </div>
        <div class="d-flex justify-space-between">
          <div>Subtotal before delivery</div>
          <div>400,00KN</div>
        </div>
      </div>
      <v-divider class="mb-3"></v-divider>
      <div class="d-flex justify-space-between">
        <div>Total</div>
        <div>400,00KN</div>
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
import { Component, Vue } from 'nuxt-property-decorator'
// import { BlogPost, getImageStatus } from '../../types'

@Component
export default class ReviewYourOrder extends Vue {}
</script>

<style scoped>
.order-page {
  order: 2;
}
</style>

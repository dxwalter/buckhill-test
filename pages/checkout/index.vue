<template>
  <v-app>
    <v-main>
      <NavigationBar />
      <v-container class="pa-16">
        <div class="checkout-container">
          <!-- breadcrumb -->
          <div class="breadcrumb mb-8">
            <div class="heading">Checkout</div>
          </div>

          <!-- checkout area -->
          <div>
            <!-- checkout tab -->
            <div class="d-flex justify-space-between">
              <div
                class="checkout-tab-item"
                :class="[tabNumber === '1' ? 'active' : '']"
                @click="changeTabNumber('1')"
              >
                <div class="label">1</div>
                <div class="description">Shipping address</div>
                <div class="line"></div>
              </div>
              <div
                class="checkout-tab-item"
                :class="[tabNumber === '2' ? 'active' : '']"
                @click="changeTabNumber('2')"
              >
                <div class="label">2</div>
                <div class="description">Payment details</div>
                <div class="line"></div>
              </div>
              <div
                class="checkout-tab-item"
                :class="[tabNumber === '3' ? 'active' : '']"
                @click="changeTabNumber('3')"
              >
                <div class="label">3</div>
                <div class="description">Review your order</div>
                <div class="line"></div>
              </div>
            </div>
            <!-- Checkout tab content -->
            <div>
              <shipping-address v-if="tabNumber === '1'" />
              <payment-details v-if="tabNumber === '2'" />
              <review-order v-if="tabNumber === '3'" />
            </div>
          </div>
        </div>
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NavigationBar from '@/layouts/NavigationBar.vue'
import Footer from '@/layouts/Footer.vue'
import ShippingAddress from '@/components/checkoutComponent/shippingAddress.vue'
import ReviewOrder from '@/components/checkoutComponent/reviewOrder.vue'
import PaymentDetails from '@/components/checkoutComponent/paymentDetails.vue'
@Component({
  components: {
    NavigationBar,
    Footer,
    ShippingAddress,
    ReviewOrder,
    PaymentDetails,
  },
})
export default class CartCheckout extends Vue {
  resetToken: string = ''
  newPassword: string = ''
  confirmNewPassword: string = ''
  email: string = ''
  $toast: any
  $api: any
  tabNumber: string = '1'

  changeTabNumber(tab: string): void {
    this.tabNumber = tab
  }

  created() {
    if (process.browser) {
      const tabNumber: string = this.$route.query.tab as unknown as string

      if (
        tabNumber === undefined ||
        tabNumber === null ||
        tabNumber.length === 0
      ) {
        this.tabNumber = '1'
      } else {
        this.tabNumber = tabNumber
      }
    }
  }
}
</script>

<style scoped></style>

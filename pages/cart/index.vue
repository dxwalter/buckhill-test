<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <v-container>
        <div class="">
          <!-- show page content -->
          <div>
            <div class="cart-details-container mt-4 mb-16">
              <!-- breadcrumb -->
              <div class="breadcrumb mb-8 mt-8">
                <div class="breadcrumb-link mb-3">
                  <NuxtLink to="/">Homepage</NuxtLink> /
                  <NuxtLink to="#" class="active">Your cart</NuxtLink>
                </div>
                <div class="heading">Your Cart</div>
              </div>

              <!-- cart listing -->
              <div v-if="allCartItems.length">
                <cart-item
                  v-for="cart in allCartItems"
                  :key="cart.uuid"
                  :cart-data="cart"
                  class="mb-10"
                />
                <div class="mt-16">
                  <NuxtLink
                    class="btn-100 v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--large green"
                    to="/checkout?tab=1"
                    >PROCEED TO CHECKOUT</NuxtLink
                  >
                </div>
              </div>
              <div v-else>
                <div class="page-error-content">
                  <div class="mb-8">
                    <v-icon large color="green darken-2">
                      mdi-cart-variant
                    </v-icon>
                  </div>
                  <div class="message mb-6">
                    No item has been added to your cart
                  </div>
                  <NuxtLink
                    class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--large green"
                    to="/"
                    >Go back Home</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import NavigationBar from '@/layouts/NavigationBar.vue'
import Footer from '@/layouts/Footer.vue'

@Component({
  components: {
    NavigationBar,
    Footer,
  },
})
export default class CartItemsListing extends Vue {
  isLoadingComplete: boolean = false
  networkError: boolean = false
  pageSetupErrorMessage: string = ''
  $api: any

  get allCartItems() {
    return this.$store.getters['cart/getAllCart']
  }
}
</script>

<style scoped>
.page-error-content {
  height: 300px;
}
</style>

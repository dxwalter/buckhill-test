<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <v-container>
        <div class="">
          <!-- display loader animation -->
          <div v-if="!isLoadingComplete">
            <div
              v-if="!isLoadingComplete && !networkError"
              class="page-setup-container"
            >
              <page-loader />
            </div>
            <!-- display error message when api request fetching page info fails -->
            <div
              v-if="!isLoadingComplete && networkError"
              class="page-setup-container"
            >
              <div class="page-error-content">
                <div class="mb-4">
                  <v-icon large color="green darken-2">
                    mdi-water-boiler-alert
                  </v-icon>
                </div>
                <div class="message mb-6">
                  {{ pageSetupErrorMessage }}
                </div>
                <v-btn color="green" dark large @click="getProductByCategory">
                  Try again</v-btn
                >
              </div>
            </div>
          </div>

          <!-- show page content -->
          <div v-else>
            <!-- product search field -->
            <search-input />

            <!-- breadcrumb -->
            <div class="align-breadcrumb">
              <div class="breadcrumb mb-8 mt-8">
                <div class="breadcrumb-link">
                  <NuxtLink to="/">Homepage</NuxtLink> /
                  <NuxtLink :to="`/category/${categoryDetails.uuid}`">{{
                    $capitalizeString(categoryDetails.title)
                  }}</NuxtLink>
                  /
                  <NuxtLink to="#" class="active add-ellipsis">{{
                    $capitalizeString(productData.title)
                  }}</NuxtLink>
                </div>
              </div>
            </div>

            <div class="product-details-container mt-4 mb-16">
              <div>
                <div class="d-flex mb-16">
                  <!-- large image -->
                  <div class="image-area mr-8">
                    <img
                      :id="`productDetails${productId}`"
                      class="fd"
                      :src="imageSrc"
                    />
                  </div>

                  <!-- product details -->
                  <div class="product-item-details">
                    <div class="name">
                      {{ $capitalizeString(productData.title) }}
                    </div>
                    <div class="brand">
                      {{ $capitalizeString(productData.brand.title) }}
                    </div>
                    <div class="price">{{ productData.price }}KN</div>
                    <div class="d-flex">
                      <!-- if item does not exist in cart, add item -->
                      <div v-if="!itemExistStatus">
                        <v-btn
                          color="green"
                          class="mr-4 white--text"
                          @click="addToCart"
                        >
                          <v-icon left dark> mdi-cart </v-icon>
                          ADD TO CART
                        </v-btn>
                      </div>
                      <!-- if item exists in cart, remove item -->
                      <div v-if="itemExistStatus">
                        <v-btn
                          color="orange"
                          class="mr-4 white--text"
                          outlined
                          @click="removeFromCart"
                        >
                          <v-icon left dark> mdi-cart-off </v-icon>
                          REMOVE FROM CART
                        </v-btn>
                      </div>
                      <div class="d-flex">
                        <v-btn @click="reduceQuantity"> - </v-btn>
                        <input
                          v-model="quantity"
                          type="text"
                          class="cart-item-quantity"
                        />
                        <v-btn @click="quantity++"> + </v-btn>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- product description -->
                <div>{{ productData.description }}</div>
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

import { Product, getImageStatus, CartItem, Category } from '../../types'

import NavigationBar from '@/layouts/NavigationBar.vue'
import Footer from '@/layouts/Footer.vue'

@Component({
  components: {
    NavigationBar,
    Footer,
  },
})
export default class ProductListingByCategory extends Vue {
  isLoadingComplete: boolean = false
  networkError: boolean = false
  pageSetupErrorMessage: string = ''
  $api: any

  imageSrc: string | undefined = ''
  productId: string = ''
  quantity: number = 1
  itemExistStatus: number = 0
  $toast: any

  productData: Product = {
    category_uuid: '',
    title: '',
    uuid: '',
    description: '',
    price: 0,
    metadata: {
      brand: '',
      image: '',
    },
    created_at: '',
    updated_at: '',
    brand: {
      uuid: '',
      title: '',
      slug: '',
      created_at: '',
      updated_at: '',
    },
    deleted_at: null,
    category: {
      uuid: '',
      title: '',
      slug: '',
      created_at: '',
      updated_at: '',
    },
  }

  categoryDetails: Category | null = null
  categoryId: string = ''

  reduceQuantity(): void {
    this.quantity = Number(this.quantity) === 1 ? 1 : Number(this.quantity) - 1
  }

  itemExistsInCart(): void {
    const getAllCart: CartItem[] = this.$store.getters['cart/getAllCart']

    const item: CartItem[] = getAllCart.filter(
      (item) => item.uuid === this.productId
    )

    this.itemExistStatus = item.length
  }

  get allCategories() {
    return this.$store.getters['categories/getAllCategories']
  }

  getCategoryDetails(): void {
    this.categoryDetails = this.allCategories.filter((data: Category) => {
      return data.uuid === this.categoryId
    })[0]
  }

  addToCart(): void {
    const cartData: CartItem = {
      category_uuid: this.productData.category_uuid,
      title: this.productData.title,
      uuid: this.productData.uuid,
      price: this.productData.price,
      description: this.productData.description,
      metadata: {
        brand: this.productData.brand.title,
        image: this.productData.metadata.image,
      },
      quantity: this.quantity === 0 ? 1 : this.quantity,
    }

    this.$store.dispatch('cart/addToCart', cartData)

    this.itemExistStatus = 1
  }

  removeFromCart(): void {
    this.$store.dispatch('cart/removeCartItem', this.productId)
    this.itemExistStatus = 0
  }

  async getImageFile(uuid: string) {
    const getImage: getImageStatus = await this.$getImageFIle(
      uuid,
      `productDetails${this.productId}`
    )
    if (!getImage.status) {
      this.$toast.error(getImage.message)
    } else {
      this.imageSrc = getImage.src
    }
  }

  async getProductByCategory(): Promise<void> {
    this.isLoadingComplete = false
    this.networkError = false

    try {
      const getProduct = await this.$api.getProductById(this.productId)

      this.productData = getProduct.data
      this.categoryId = this.productData.category_uuid
      this.getCategoryDetails()

      this.getImageFile(this.productData.metadata.image)
      this.itemExistsInCart()

      this.networkError = false
      this.isLoadingComplete = true
    } catch (error: any) {
      this.isLoadingComplete = false
      this.networkError = true
      this.pageSetupErrorMessage =
        error.error || error.message || 'An error occurred'
    }
  }

  async created(): Promise<void> {
    this.productId = this.$route.params.id

    if (this.productId === undefined || !this.productId.length) {
      this.$router.go(-1)
    }

    await this.getProductByCategory()
  }
}
</script>

<style scoped></style>

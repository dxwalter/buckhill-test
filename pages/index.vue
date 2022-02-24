<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <v-container>
        <div class="inner-container">
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
                <div class="message mb-6">{{ pageSetupErrorMessage }}</div>
                <v-btn color="green" dark large @click="pageSetup">
                  Try again</v-btn
                >
              </div>
            </div>
          </div>

          <!-- show page content -->
          <div v-else>
            <!-- product search field -->
            <search-input />

            <!-- promotion -->
            <div class="mt-4 mb-16">
              <promotion-banner :promotion-data="latestPromotion" />
            </div>

            <!-- Category 1 -->
            <div class="mt-4 mb-16">
              <product-carousel :product-listing="productsFromCategoryOne" />
            </div>

            <!-- blog -->
            <div class="mt-4 mb-16">
              <blog-story
                :blog-post="{
                  post: allBlogPost[0],
                  swap: false,
                }"
              />
            </div>

            <!-- category 2 -->
            <div class="mt-4 mb-16">
              <product-carousel :product-listing="productsFromCategoryTwo" />
            </div>

            <!-- blog -->
            <div class="mb-16">
              <blog-story
                :blog-post="{
                  post: allBlogPost[0],
                  swap: true,
                }"
              />
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
import { LatestPromotion, Category, BlogPost, Product } from '../types'
import NavigationBar from '@/layouts/NavigationBar.vue'
import Footer from '@/layouts/Footer.vue'

@Component({
  components: {
    NavigationBar,
    Footer,
  },
})
export default class ProductListing extends Vue {
  isLoadingComplete: boolean = false
  networkError: boolean = false
  pageSetupErrorMessage: string = ''
  $api: any
  $toast: any

  productsFromCategoryOne: any = {}
  productsFromCategoryTwo: any = {}

  latestPromotion: LatestPromotion = {
    uuid: '',
    content: '',
    metadata: {
      image: '',
      valid_to: '',
      valid_from: '',
    },
    title: '',
    created_at: '',
    updated_at: '',
  }

  allBlogPost: BlogPost[] = []

  get allCategories() {
    return this.$store.getters['categories/getAllCategories']
  }

  async getPromotions(): Promise<void> {
    try {
      const promotion = await this.$api.getPromotion()
      this.latestPromotion = promotion.data.length > 0 ? promotion.data[0] : {}
    } catch (error: any) {
      this.networkError = true
      this.pageSetupErrorMessage =
        error.error || error.message || 'An error occurred'
      throw new Error(error)
    }
  }

  async getAllCategories(): Promise<void> {
    const currentTime: number = Math.round(new Date().getTime() / 1000)
    const getLastUpdated: number =
      this.$store.getters['categories/getCategoryLastUpdated']

    if (currentTime - getLastUpdated <= 1800) return

    try {
      const categories = await this.$api.getAllCategories()
      this.$store.dispatch('categories/saveAllCategories', categories.data)
      this.$store.dispatch('categories/saveLastCategoryUpdated', currentTime)
    } catch (error: any) {
      this.networkError = true
      this.pageSetupErrorMessage =
        error.error || error.message || 'An error occurred'
      throw new Error(error)
    }
  }

  async getAllBrands(): Promise<void> {
    const currentTime: number = Math.round(new Date().getTime() / 1000)
    const getLastUpdated: number =
      this.$store.getters['brands/getBrandLastUpdated']

    if (currentTime - getLastUpdated <= 1800) return

    try {
      const brands = await this.$api.getAllBrands()
      this.$store.dispatch('brands/saveAllBrands', brands.data)
      this.$store.dispatch('brands/saveLastBrandUpdated', currentTime)
    } catch (error: any) {
      this.$toast.error(error.error || error.message || 'An error occurred')
    }
  }

  async getRandomProduct(): Promise<void> {
    const allCategories: Category[] = this.allCategories
    // clone allCategories array and retrieve two random elements
    const randomItems = JSON.parse(JSON.stringify(allCategories))
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)

    const urlParams: { url: string; categoryName: string }[] = []

    randomItems.forEach((data: Category) => {
      urlParams.push({
        url: `products?category=${data.uuid}`,
        categoryName: data.title,
      })
    })

    try {
      const getAllProducts: Product[] =
        await this.$api.getProductsFromMultiCategories([
          urlParams[0].url,
          urlParams[1].url,
        ])

      this.productsFromCategoryOne = {
        categoryName: urlParams[0].categoryName,
        products: getAllProducts[0],
      }

      this.productsFromCategoryTwo = {
        categoryName: urlParams[1].categoryName,
        products: getAllProducts[1],
      }
    } catch (error: any) {
      this.networkError = true
      this.pageSetupErrorMessage =
        error.error || error.message || 'An error occurred'
      throw new Error(error)
    }
  }

  async getBlogPost(): Promise<void> {
    try {
      const getBlogPost = await this.$api.getBlogPostList()
      if (getBlogPost.data.length > 2) {
        this.allBlogPost = this.$getRandomBlogPost(getBlogPost.data)
      } else {
        this.allBlogPost = getBlogPost.data
      }
    } catch (error: any) {
      this.networkError = true
      this.pageSetupErrorMessage =
        error.error || error.message || 'An error occurred'
      throw new Error(error)
    }
  }

  async pageSetup(): Promise<void> {
    this.isLoadingComplete = false
    this.networkError = false

    try {
      await this.getPromotions()
      await this.getAllCategories()
      await this.getRandomProduct()
      await this.getBlogPost()
      this.getAllBrands()
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
    await this.pageSetup()
  }
}
</script>

<style scoped></style>

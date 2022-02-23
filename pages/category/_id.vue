<template>
<v-app>
  <NavigationBar />
  <v-main>
    <v-container>
      <div class="">

        <!-- display loader animation -->
        <div v-if="!isLoadingComplete">
          <div v-if="!isLoadingComplete && !networkError" class="page-setup-container">
            <page-loader />
          </div>
          <!-- display error message when api request fetching page info fails -->
          <div v-if="!isLoadingComplete && networkError" class="page-setup-container">
              <div class="page-error-content">
                <div class="mb-4"><v-icon large color="green darken-2"> mdi-water-boiler-alert </v-icon> </div>
                <div class="message mb-6">An error occurred. Kindly try again</div>
                <v-btn color="green" dark large @click="getProductByCategory"> Try again</v-btn>
              </div>
          </div>
        </div>

        <!-- show page content -->
        <div v-else>
          
          <!-- product search field -->
          <search-input />



            <div v-if="productList.length > 0" class="category-container mt-4 mb-16">
                
                
                <div class="category-sidebar">  
                  <v-expansion-panels focusable>
                    <v-expansion-panel>
                      <v-expansion-panel-header>Price</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div class="" >
                          <v-range-slider
                            hint="Select price range"
                            max="5000"
                            min="0"
                          ></v-range-slider>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>


                    <v-expansion-panel>
                      <v-expansion-panel-header>Brand</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div v-for="brand in allBrands" :key="brand.uuid" class="expand-arc-item" @click="selectBarnd(brand.title, brand.uuid)">
                          <div>{{ brand.title }}</div>
                          <div>(0)</div>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>


                    <v-expansion-panel>
                      <v-expansion-panel-header>Category</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div v-for="category in allCategories" :key="category.uuid" class="expand-arc-item" @click="selectBarnd(category.title, category.uuid)">
                          <div>{{ category.title }}</div>
                          <div>(0)</div>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>


                <div class="category-product-listing">
                    <product-item v-for="product in productList" :key="product.uuid" :product-item="product" :show-cart-btn="true" />
                </div>
            </div>

            <div v-else>
                <div class="category-error-container">
                    <div class="align">
                        <div class="mb-4"><v-icon large color="green darken-2"> mdi-clipboard-text-search-outline </v-icon> </div>
                        <div class="category-error-esssage">No product has been added to this category</div>
                        <NuxtLink class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--large green" to="/">Go back Home</NuxtLink>
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

    import { Component, Vue } from 'nuxt-property-decorator';

    import { Product } from '../../types'

    import NavigationBar from '@/layouts/NavigationBar.vue';
    import Footer from '@/layouts/Footer.vue';

    @Component({
      components: {
        NavigationBar,
        Footer
      }
    })
    export default class ProductListingByCategory extends Vue {
        
        isLoadingComplete: boolean = false
        networkError: boolean = false
        pageSetupErrorMessage: string = ''
        $api: any;

        categoryId: string = ''

        productList: Product[] = []


        get allCategories () {
          return this.$store.getters['categories/getAllCategories'];
        }

        get allBrands () {
          return this.$store.getters['brands/getAllBrands'];
        }

        selectBarnd(title: string, id: string): void {
          console.log({
            title, id
          })
        }

        selectCategory(title: string, id: string): void {
          console.log({
            title, id
          })
        }


        async getProductByCategory(): Promise<void> {
          
          this.isLoadingComplete = false
          this.networkError = false

          try {
            
            const getProduct = await this.$api.getProductByCategory(this.categoryId);

            this.productList = getProduct.data

            this.networkError = false
            this.isLoadingComplete = true
          } catch (error: any) {
            this.isLoadingComplete = false
            this.networkError = true
            this.pageSetupErrorMessage = error.error || error.message || 'An error occurred'
          }
          
        }

        async created(): Promise<void> {
          this.categoryId = this.$route.params.id;

          if (this.categoryId === undefined || !this.categoryId.length) {
              this.$router.go(-1)
          }

          await this.getProductByCategory()
        }
    };
</script>

<style scoped>

</style>
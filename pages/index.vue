<template>
<v-app>
  <NavigationBar />
  <v-main>
    <v-container>
      <div class="inner-container">

        <!-- display loader animation -->
        <div v-if="!isLoadingComplete || !isSetupError">
          <div class="page-setup-container">
            <!-- page loader -->
            <div v-if="!isLoadingComplete">
              <page-loader />
            </div>
            <!-- Error message -->
            <div v-else>
              <div class="page-error-content">
                <div class="mb-4"><v-icon large color="green darken-2"> mdi-water-boiler-alert </v-icon> </div>
                <div class="message mb-6">An error occurred. Kindly try again</div>
                <v-btn color="green" dark large @click="pageSetup"> Try again</v-btn>
              </div>
            </div>
          </div>
        </div>


        <!-- show page content -->
        <div v-else>
          <!-- product search field -->
          <div class="search-box-container mt-4 mb-4">
            <v-text-field
              outlined
              label="Search products"
              color="green"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </div>

          <!-- promotion -->
          <div></div>

          <!-- Category 1 -->
          <div></div>

          <!-- blog -->
          <div></div>

          <!-- category 2 -->
          <div></div>

          <!-- blog -->
          <div></div>
        </div>


      </div>
    </v-container>
  </v-main>
</v-app>
</template>

<script lang="ts">

    import { Component, Vue } from 'nuxt-property-decorator';
    import { LatestPromotion } from '../types'
    import NavigationBar from '@/layouts/NavigationBar.vue';

    @Component({
      components: {
        NavigationBar,
      }
    })
    export default class ProductListing extends Vue {
        
        isLoadingComplete: boolean = false
        isSetupError: boolean = false
        pageSetupErrorMessage: string = ''
        $api: any

        latestPromotion: LatestPromotion = {
          uuid: '',
          content: '',
          metadata: {
            image: '',
            valid_to: '',
            valid_from: ''
          },
          title: '',
          created_at: '',
          updated_at: ''
        }

        async getPromotions (): Promise<void> {
          try {
            
            const promotion = await this.$api.getPromotion();
            this.latestPromotion = promotion.data[0]

          } catch (error: any) {
            this.isSetupError = true
            this.pageSetupErrorMessage = error.error || error.message || 'An error occurred'
          }
        }

        async pageSetup(): Promise<void> {
          
          this.isLoadingComplete = false
          this.isSetupError = false

          try {
            await this.getPromotions();
            this.isLoadingComplete = true
            this.isSetupError = true
          } catch (error: any) {

            this.isSetupError = true
            this.pageSetupErrorMessage = error.error || error.message || 'An error occurred'
          }
          
        }

        async created(): Promise<void> {
          await this.pageSetup()
        }
    };
</script>

<style scoped>

</style>
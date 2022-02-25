<template>
  <div class="checkout-item-container">
    <div class="tab-header">Shipping Address</div>
    <div class="form-area">
      <div class="d-flex mb-4">
        <v-text-field
          label="First name *"
          color="green"
          required
          class="mr-4"
        ></v-text-field>
        <v-text-field
          label="First name *"
          color="green"
          required
        ></v-text-field>
      </div>
      <div class="mb-4">
        <v-text-field
          label="Address line 1 *"
          color="green"
          required
        ></v-text-field>
      </div>
      <div class="mb-4">
        <v-text-field label="Address line 2 *" color="green"></v-text-field>
      </div>
      <div class="d-flex mb-4">
        <v-text-field
          label="City"
          color="green"
          required
          class="mr-4"
        ></v-text-field>
        <v-text-field
          label="State/Province/Region"
          color="green"
          required
        ></v-text-field>
      </div>
      <div class="d-flex mb-4">
        <v-text-field
          label="Zip/Postal code *"
          color="green"
          required
          class="mr-4"
        ></v-text-field>
        <v-text-field label="Country *" color="green" required></v-text-field>
      </div>
      <v-checkbox
        v-model="useAddressAlways"
        color="green"
        label="Use this address for payment details"
      ></v-checkbox>
      <div class="d-flex justify-end mt-8">
        <v-btn id="initiateLogin" color="green" dark large type="submit">
          NEXT
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { BlogPost, getImageStatus } from '../../types'

@Component
export default class ShippingAddress extends Vue {
  firstName: string = ''
  lasttName: string = ''
  addressLineOne: string = ''
  addressLineTwo: string = ''
  city: string = ''
  state: string = ''
  postalCode: string = ''
  country: string = ''
}
</script>

<style scoped>
.order-page {
  order: 2;
}
</style>

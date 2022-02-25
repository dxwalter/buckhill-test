<template>
  <div class="checkout-item-container">
    <div class="tab-header">Shipping Address</div>
    <form @submit.prevent="setupShippingAddress">
      <div class="form-area">
        <div class="d-flex mb-4">
          <v-text-field
            v-model="firstName"
            label="First name *"
            color="green"
            required
            class="mr-4"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Last name *"
            color="green"
            required
          ></v-text-field>
        </div>
        <div class="mb-4">
          <v-text-field
            v-model="addressLineOne"
            label="Address line 1 *"
            color="green"
            required
          ></v-text-field>
        </div>
        <div class="mb-4">
          <v-text-field
            v-model="addressLineTwo"
            required
            label="Address line 2 *"
            color="green"
          ></v-text-field>
        </div>
        <div class="d-flex mb-4">
          <v-text-field
            v-model="city"
            label="City"
            color="green"
            required
            class="mr-4"
          ></v-text-field>
          <v-text-field
            v-model="state"
            label="State/Province/Region"
            color="green"
            required
          ></v-text-field>
        </div>
        <div class="d-flex mb-4">
          <v-text-field
            v-model="postalCode"
            label="Zip/Postal code *"
            color="green"
            required
            class="mr-4"
          ></v-text-field>
          <v-text-field
            v-model="country"
            label="Country *"
            color="green"
            required
          ></v-text-field>
        </div>
        <v-checkbox
          v-model="useForPayment"
          color="green"
          label="Use this address for payment details"
        ></v-checkbox>
        <div class="d-flex justify-end mt-8">
          <v-btn color="green" dark large type="submit"> NEXT </v-btn>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { ShippingAddress } from '../../types'

@Component
export default class ShippingAddressDetails extends Vue {
  @Prop({ required: true, type: Object, default: {} })
  shippingDetailsRevamp!: {}

  firstName: string = ''
  lastName: string = ''
  addressLineOne: string = ''
  addressLineTwo: string = ''
  city: string | undefined = ''
  state: string | undefined = ''
  postalCode: string = ''
  country: string = ''
  useForPayment: boolean = false

  setupShippingAddress(): void {
    const shippingDetails: ShippingAddress = {
      firstName: this.firstName,
      lastName: this.lastName,
      addressLineOne: this.addressLineOne,
      addressLineTwo: this.addressLineTwo,
      zipCode: this.postalCode,
      country: this.country,
      useForPayment: this.useForPayment,
      city: this.city,
      state: this.state,
    }

    this.$emit('set-shipping-details', shippingDetails)
  }

  @Watch('shippingDetailsRevamp', { immediate: true, deep: true })
  revampShipDetails(newVal: ShippingAddress) {
    this.firstName = newVal.firstName
    this.lastName = newVal.lastName
    this.addressLineOne = newVal.addressLineOne
    this.addressLineTwo = newVal.addressLineTwo
    this.city = newVal.city
    this.state = newVal.state
    this.postalCode = newVal.zipCode
    this.country = newVal.country
    this.useForPayment = newVal.useForPayment
  }
}
</script>

<style scoped>
.order-page {
  order: 2;
}
</style>

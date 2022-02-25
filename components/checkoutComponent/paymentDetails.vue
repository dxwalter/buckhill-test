<template>
  <div class="checkout-item-container">
    <div class="tab-header">Payment Details</div>

    <div class="form-area">
      <form @submit.prevent="setPaymentDetails()">
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
            label="Address line 2 *"
            color="green"
          ></v-text-field>
        </div>
        <div class="d-flex mb-4">
          <v-text-field
            v-model="city"
            label="City"
            color="green"
            class="mr-4"
          ></v-text-field>
          <v-text-field
            v-model="state"
            label="State/Province/Region"
            color="green"
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
          v-model="useAddressAlways"
          color="green"
          label="Payment details are same as shipping details"
        ></v-checkbox>

        <div class="tab-header mt-8">Type of payment</div>
        <div class="form-area">
          <!-- payment method tab menu -->
          <div class="payment-method-tab d-flex justify-space-between">
            <v-card
              class="payment-tab-item"
              :class="[paymentMethod === 'card' ? 'active' : '']"
              @click="setPaymentMethod('card')"
            >
              <v-icon large color="green darken-2">
                mdi-credit-card-outline
              </v-icon>
              <div class="mt-4 type">Credit card</div>
            </v-card>
            <v-card
              class="payment-tab-item"
              :class="[paymentMethod === 'cash' ? 'active' : '']"
              @click="setPaymentMethod('cash')"
            >
              <v-icon large color="green darken-2"> mdi-cash-100 </v-icon>
              <div class="mt-4 type">Cash on delivery</div>
            </v-card>
            <v-card
              class="payment-tab-item"
              :class="[paymentMethod === 'transfer' ? 'active' : '']"
              @click="setPaymentMethod('transfer')"
            >
              <v-icon large color="green darken-2">
                mdi-swap-horizontal
              </v-icon>
              <div class="mt-4 type">Bank transfer</div>
            </v-card>
          </div>
          <!-- payment method tab content -->
          <div class="payment-method-content mt-8">
            <!-- card method -->
            <div v-if="paymentMethod === 'card'">
              <div class="payment-type-header">Card details</div>
              <div class="mb-4">
                <v-text-field
                  v-model="cc_CardNumber"
                  label="Credit card number *"
                  color="green"
                  required
                  type="number"
                ></v-text-field>
              </div>
              <div class="d-flex mb-4">
                <v-text-field
                  v-model="cc_CardExpiration"
                  label="Expiry *"
                  color="green"
                  required
                  class="mr-4"
                ></v-text-field>
                <v-text-field
                  v-model="cc_CardCCV"
                  label="CVV *"
                  color="green"
                  required
                  type="number"
                ></v-text-field>
              </div>
            </div>

            <!-- Cash method -->
            <div v-if="paymentMethod === 'cash'">
              <div class="payment-type-header">Cash on delivery</div>
              <div class="d-flex mb-4">
                <v-text-field
                  v-model="cd_FirstName"
                  label="First name *"
                  color="green"
                  required
                  class="mr-4"
                ></v-text-field>
                <v-text-field
                  v-model="cd_LastName"
                  label="Last name *"
                  color="green"
                  required
                ></v-text-field>
              </div>
              <div class="mb-4">
                <v-text-field
                  v-model="cd_AddressOne"
                  required
                  label="Address line 1 *"
                  color="green"
                ></v-text-field>
              </div>
              <div class="mb-4">
                <v-text-field
                  v-model="cd_AddressTwo"
                  required
                  label="Address line 2 *"
                  color="green"
                ></v-text-field>
              </div>
              <v-checkbox
                v-model="cd_Terms"
                color="green"
                label="I consent to your T&C's"
              ></v-checkbox>
            </div>

            <!-- transfer method -->
            <div v-if="paymentMethod === 'transfer'">
              <div class="payment-type-header">Bank transfer</div>
              <div class="mb-4">
                <v-text-field
                  v-model="bt_SwiftCode"
                  required
                  label="Bank SWIFT code *"
                  color="green"
                  type="text"
                ></v-text-field>
              </div>
              <div class="d-flex mb-4">
                <v-text-field
                  v-model="bt_IbanNumber"
                  label="IBAN *"
                  color="green"
                  required
                  class="mr-4"
                  type="number"
                ></v-text-field>
                <v-text-field
                  v-model="bt_Name"
                  label="Name *"
                  color="green"
                  required
                ></v-text-field>
              </div>
              <div class="mb-4">
                <v-text-field
                  v-model="bt_RefCode"
                  required
                  label="Ref code *"
                  color="green"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-end mt-16">
          <v-btn
            class="mr-4"
            outlined
            color="green"
            dark
            large
            type="button"
            @click="moveToPrevious"
          >
            PREVIOUS
          </v-btn>
          <v-btn id="setPaymentDetails" color="green" dark large type="submit">
            NEXT
            <btn-loader />
          </v-btn>
        </div>
      </form>
      <!-- end of form -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { ShippingAddress } from '../../types'

@Component
export default class PaymentDetails extends Vue {
  @Prop({ required: true, type: Object, default: {} })
  shippingDetails!: {}

  firstName: string = ''
  lastName: string = ''
  addressLineOne: string = ''
  addressLineTwo: string = ''
  city: string | undefined = ''
  state: string | undefined = ''
  postalCode: string = ''
  country: string = ''

  //   pay with card
  cc_CardNumber: string = ''
  cc_CardExpiration: string = ''
  cc_CardCCV: string = ''

  //   pay with cash on delivery
  cd_FirstName: string = ''
  cd_LastName: string = ''
  cd_AddressOne: string = ''
  cd_AddressTwo: string = ''
  cd_Terms: boolean = false

  //   pay by bank transfer
  bt_SwiftCode: string = ''
  bt_IbanNumber: string = ''
  bt_Name: string = ''
  bt_RefCode: string = ''

  useAddressAlways: boolean = false

  paymentMethod: string = 'card'
  $toast: any
  $api: any

  setPaymentMethod(method: string): void {
    this.paymentMethod = method
  }

  moveToPrevious(): void {
    this.$emit('move-to-previous', '1')
  }

  async setPaymentDetails(): Promise<void> {
    const paymentDetails: any = {
      details: {
        customer: {},
        type_details: {},
      },
      type: '',
    }

    paymentDetails.details.customer = {
      first_name: this.firstName,
      last_name: this.lastName,
      address_line_one: this.addressLineOne,
      address_line_two: this.addressLineTwo,
      city: this.city,
      state: this.state,
      postal_code: this.postalCode,
      country: this.country,
    }

    if (this.paymentMethod === 'card') {
      paymentDetails.type = 'credit_card'
      paymentDetails.details.type_details = {
        credit_card_number: this.cc_CardNumber,
        credit_card_expiry_date: this.cc_CardExpiration,
        credit_card_cvv: this.cc_CardCCV,
      }
    }

    if (this.paymentMethod === 'cash') {
      if (!this.cd_Terms) {
        return this.$toast.error('Accept T&C to continue')
      }
      paymentDetails.type = 'cash_on_delivery'
      paymentDetails.details.type_details = {
        first_name: this.firstName,
        last_name: this.lastName,
        address_line_one: this.addressLineOne,
        address_line_two: this.addressLineTwo,
      }
    }

    if (this.paymentMethod === 'transfer') {
      paymentDetails.type = 'bank_transfer'
      paymentDetails.details.type_details = {
        swift_code: this.bt_SwiftCode,
        iban: this.bt_IbanNumber,
        name: this.bt_Name,
        ref_code: this.bt_RefCode,
      }
    }

    this.$startButtonLoader('setPaymentDetails')
    // I can't create a payment method. THe API stated that I am unauthorised to do that Even when signed in
    try {
      await this.$api.createPayment(paymentDetails)
    } catch (error) {
      this.$toast.error(error)
    }
    this.$stopButtonLoader('setPaymentDetails')
    this.$emit('set-payment-details', paymentDetails)
  }

  @Watch('shippingDetails', { immediate: true, deep: true }) checkRecipient(
    newVal: ShippingAddress
  ) {
    if (newVal.useForPayment) {
      this.firstName = newVal.firstName
      this.lastName = newVal.lastName
      this.addressLineOne = newVal.addressLineOne
      this.addressLineTwo = newVal.addressLineTwo
      this.city = newVal.city
      this.state = newVal.state
      this.postalCode = newVal.zipCode
      this.country = newVal.country
    }
  }

  @Watch('useAddressAlways', { immediate: true, deep: true }) setForPayment() {
    this.cd_FirstName = this.firstName
    this.cd_LastName = this.lastName
    this.cd_AddressOne = this.addressLineOne
    this.cd_AddressTwo = this.addressLineTwo
  }
}
</script>

<style scoped>
.order-page {
  order: 2;
}
</style>

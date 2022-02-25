<template>
  <div class="checkout-item-container">
    <div class="tab-header">Payment Details</div>

    <div class="form-area">
      <form @submit.prevent="setPaymentDetails()">
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
                  label="Address line 1 *"
                  color="green"
                ></v-text-field>
              </div>
              <div class="mb-4">
                <v-text-field
                  v-model="cd_AddressTwo"
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
                  label="Ref code *"
                  color="green"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-end mt-16">
          <v-btn
            id="initiateLogin"
            class="mr-4"
            outlined
            color="green"
            dark
            large
            type="button"
          >
            PREVIOUS
          </v-btn>
          <v-btn id="initiateLogin" color="green" dark large type="submit">
            NEXT
          </v-btn>
        </div>
      </form>
      <!-- end of form -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { BlogPost, getImageStatus } from '../../types'

@Component
export default class PaymentDetails extends Vue {
  firstName: string = ''
  lasttName: string = ''
  addressLineOne: string = ''
  addressLineTwo: string = ''
  city: string = ''
  state: string = ''
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

  paymentMethod: string = 'card'

  setPaymentMethod(method: string): void {
    this.paymentMethod = method
  }

  setPaymentDetails(): void {}
}
</script>

<style scoped>
.order-page {
  order: 2;
}
</style>

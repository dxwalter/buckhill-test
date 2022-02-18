<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="500px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card class="pa-6">

        <div class="d-flex justify-end">
          <v-btn fab elevation="0" class="pa-2" @click="closeDialog">
            <v-icon white >
              mdi-close
            </v-icon>
          </v-btn>
        </div>

        <div class="d-flex align-center flex-column mb-1">
          <div class="signin-logo">
            <img  src="/images/complete-logo.svg">
          </div>
          <p class="mt-4 signin-header">Sign up</p>
        </div>

        <!-- input areas -->
        <form @submit.prevent="createUserAccount()">
          <div class="mb-4 d-flex justify-space-center">
            <div class="mr-2 flex-grow-1">
                <input id=""  v-model="firstName" type="text"  name="first_name"  placeholder="First Name*" class="text-input">
            </div>
            <div class="ml-2 -grow-1">
                <input id=""  v-model="lastName" type="text" name="last_name" placeholder="Last Name*" class="text-input">
            </div>
          </div>
          <div class="mb-4">
            <input id=""  v-model="email" type="email" name="email" placeholder="Email address*" class="text-input">
          </div>
          <div class="mb-4">
            <input id="" v-model="homeAddress" type="text" name="home_address" placeholder="Main address" class="text-input">
          </div>
          <div class="mb-4">
            <input id="" v-model="phoneNumber" type="text" name="home_address" placeholder="Phone number" class="text-input">
          </div>
          <div class="mb-4">
            <input id=""  v-model="password" type="password" name="password" placeholder="Password*" class="text-input">
          </div>
          <div class="mb-4">
            <input id="" v-model="confirmPassword" type="password" name="confirm_password" placeholder="Confirm Password*" class="text-input">
          </div>
          <div class="mb-4">
            <v-checkbox
              v-model="indicateInterest"
              :label="`I want to receive inspiration, marketing promotions and updates via email.`"
            ></v-checkbox>
          </div>
          <div class="mb-2">
            <v-btn
              id="createUserAccount"
              color="green"
              class="btn-100"
              dark
              large
              full
              type="submit"
            >
            SIGN UP
            <btn-loader/>
            </v-btn>
          </div>
          <div class="d-flex justify-center">
            <div  class="page-link" @click="showLoginModal">Already have an account? Log in</div>
          </div>
        </form>

      </v-card>
      <set-user-token
        v-if="signUp"
        :user-data="userData"
      />
    </v-dialog>
  </v-row>
</template>

<script lang="ts">

    import { Component, Vue } from 'nuxt-property-decorator'

    import { RegisterUser, UserData, AuthenticateUserResponse } from '../types/'

    @Component({})
    export default class Login extends Vue {
      
      showDialog: boolean = true
      signUp: boolean = false
      userData: UserData | null = null
      $toast: any

      indicateInterest: boolean = false
      firstName: string = '';
      lastName: string = '';
      email: string = '';
      password: string = '';
      confirmPassword: string = '';
      phoneNumber: string = '';
      homeAddress: string = '';
      $api: any;
      $startButtonLoader: any;
      $stopButtonLoader: any;  


      closeDialog(): void {
        this.$emit('close-registration-dialog')
      }

      showLoginModal(): void {
          this.$emit('show-login-dialog')
      }

      async createUserAccount(): Promise<void> {
        if (!this.firstName.length) {
          return this.$toast.error('Enter your first name')
        }

        if (!this.lastName.length) {
          return this.$toast.error('Enter your last name')
        }

        if (!this.email.length) {
          return this.$toast.error('Enter your email address')
        }

        if (!this.phoneNumber) {
          return this.$toast.error('Enter a valid phone number')
        }

        if (this.password.length < 8) {
          return this.$toast.error('Your password must be at least 8 characters')
        }

        if (this.password !== this.confirmPassword) {
          return this.$toast.error('Your passwords do not match')
        }

        if (!this.homeAddress) {
          return this.$toast.error('Enter yout home address')
        }

        this.$startButtonLoader('createUserAccount')

        try {

          const userData: RegisterUser = {
            is_marketing: this.indicateInterest,
            address: this.homeAddress,
            last_name: this.lastName,
            first_name: this.firstName,
            email: this.email,
            avatar: '',
            password: this.password,
            password_confirmation: this.confirmPassword,
            phone_number: this.phoneNumber
          }
          const registration: AuthenticateUserResponse = await this.$api.register(userData);
          this.userData = registration.data
          this.signUp = true
          this.$toast.success('Account registered successfully')

          this.closeDialog()

        } catch (error: any) {
          this.$toast.error(error.error || error.message || 'An error occurred')
        }

        this.$stopButtonLoader('createUserAccount')

      }
    };
</script>
<style scoped>
.v-label {
    color: rgb(61, 61, 61);
}
</style>
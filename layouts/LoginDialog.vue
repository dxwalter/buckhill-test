<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="500px"
    >
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
          <p class="mt-4 signin-header">Log in</p>
        </div>

        <!-- input areas -->
        <form @submit.prevent="initiateLogin()">
          <div class="mb-4">
            <input  id="" v-model="emailAddress" type="email" name="email" placeholder="Email address*" class="text-input">
          </div>
          <div class="mb-6">
            <input id="" v-model="password" type="password" name="password" placeholder="Password*" class="text-input">
          </div>
          <div class="mb-6">
            <v-checkbox
              v-model="checkbox"
              :label="`Remember me`"
            ></v-checkbox>
          </div>
          <div class="mb-6">
            <v-btn
              id="initiateLogin"
              color="green"
              class="btn-100"
              dark
              large
              full
              type="submit"
            >
            LOG IN
            <btn-loader/>
            </v-btn>
          </div>
          <div class="d-flex justify-space-between">
            <NuxtLink class="page-link" to="/auth/forgot-password">Forgot Password?</NuxtLink>
            <div class="page-link" @click="showRegistrationDialog">Don't have an account? Sign up</div>
          </div>
        </form>

      </v-card>
    </v-dialog>

      <set-user-token
        v-if="signIn"
        :user-data="userData"
      />
  </v-row>
</template>

<script lang="ts">

    import { Component, Vue } from 'nuxt-property-decorator';
    import { LoginUser, LoginUserResponse, AuthenticateUserResponse, UserData } from '../types/'

    @Component({})
    export default class Login extends Vue {
      
      showDialog: boolean = true;
      checkbox: boolean = false;
      userData: UserData | null = null
      signIn: boolean = false

      emailAddress: string = '';
      password: string = '';
      $toast: any;
      $api: any;
      $stopButtonLoader: any;
      $startButtonLoader: any;

      closeDialog(): void {
        this.$emit('close-login-dialog')
      }

      showRegistrationDialog(): void {
        this.$emit('show-registraion-dialog')
      }

      async initiateLogin(): Promise<void> {

        if (!this.emailAddress.length || !this.password) {
          return this.$toast.error('Enter an email address and password to continue')
        }

        this.$startButtonLoader('initiateLogin')
        
        try {

          const loginObject: LoginUser = {
            email: this.emailAddress,
            password: this.password
          }

          const loginUser: LoginUserResponse = await this.$api.login(loginObject);
          this.$api.setToken(loginUser.data.token);

          const getUserDetails: AuthenticateUserResponse = await this.$api.getUser();
          getUserDetails.data.token = loginUser.data.token;
          
          this.userData = getUserDetails.data
          this.signIn = true

          setTimeout(() => {
            this.$toast.success('Login was successful');
            this.closeDialog()
          }, 500);

        } catch (error: any) {
          this.$toast.error(error.error || error.message || 'An error occurred')
        }

        this.$stopButtonLoader('initiateLogin')
      }
    };
</script>
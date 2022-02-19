<template>
  <div>
      <v-app-bar
        color="green"
        app
        class="px-16 d-flex nav-modifier"
      >
          <v-toolbar-title class="d-flex nav-img">
            <img  src="/images/logo.svg" class="mr-2 align-self-center">
            <div class="align-self-center">Petson.</div>
          </v-toolbar-title>
          
          <div class="d-flex justify-center nav-link">
            <NuxtLink to="/" class="mr-6">
              Products
              <v-icon right color="white">
                mdi-chevron-down
              </v-icon>
            </NuxtLink>
            <NuxtLink to="/" class="mr-6">Blogs</NuxtLink>
            <NuxtLink to="/">Promotions</NuxtLink>
          </div>

          <div class="d-flex">
            <v-btn elevation="2" large outlined class="mr-4" color="white">
              <v-icon left>
                mdi-cart
              </v-icon>
              Cart
            </v-btn>
            <div class="align-self-center">
              <v-btn v-if="!getLoginStatus" elevation="2" large outlined color="white" @click="showLoginDialog">
                  Login
              </v-btn>
              <v-btn v-if="getLoginStatus" id="logOutUser" elevation="2" large outlined color="white" @click="logOutUser">
                  Logout
                  <btn-loader/>
              </v-btn>
            </div>
            <div v-if="getLoginStatus" class="nav-avatar align-self-center">
              <img class="ml-8" :src="getProfilePicture">
            </div>
          </div>
      </v-app-bar>

      <LoginDialog 
        v-if="loginDialog"
        @close-login-dialog="closeLoginDialog"
        @show-registraion-dialog="showRegistrationDialog"
      />
      
      <RegistrationDialog
        v-if="registrationDialog"
        @close-registration-dialog="closeRegistrationDialog"
        @show-login-dialog="showLoginDialog"
      />
  </div>
</template>

<script lang="ts">

    import { Component, Vue } from 'nuxt-property-decorator'
    import LoginDialog from '@/layouts/LoginDialog.vue'
    import RegistrationDialog from '@/layouts/RegistrationDailog.vue'
    @Component({
      components: {
        LoginDialog,
        RegistrationDialog
      }
    })
    export default class PageHeader extends Vue {
              
      loginDialog: boolean = false;
      registrationDialog: boolean = false;
      defaultAvatar: string = '/images/avatar.png'
      $cookies: any;
      $toast: any;
      $api: any;

      get getLoginStatus() {
        return this.$store.getters['account/getLoginStatus']
      }

      get getProfilePicture() {
        return (this.$store.getters['account/getProfilePicture'] === null || this.$store.getters['account/getProfilePicture'] === undefined)
        ? this.defaultAvatar 
        : this.$store.getters['account/getProfilePicture']; 
      }

      showLoginDialog(): void {
        this.closeRegistrationDialog()
        this.loginDialog = true
      }

      showRegistrationDialog(): void {
        this.closeLoginDialog()
        this.registrationDialog = true
      }

      closeRegistrationDialog(): void {
        this.registrationDialog = false
      }

      closeLoginDialog(): void {
        this.loginDialog = false
      }

      async logOutUser(): Promise<void> {

        this.$startButtonLoader('logOutUser')

        try {
          await this.$api.logout()
          await this.$cookies.remove('token')
          // eslint-disable-next-line no-unused-expressions
          this.$store.dispatch('account/logout')
          window.location.href = window.location.origin 
        } catch (error: any) {
          this.$toast.error(error.error || error.message || 'An error occurred')
        }

        this.$stopButtonLoader('logOutUser')
      }
    };
</script>

<style scoped>
.v-toolbar__title{
  width: 200px !important;      
  color: white;
}
</style>
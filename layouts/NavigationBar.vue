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
              <v-btn elevation="2" large outlined color="white" @click="showLoginDialog">
                  Login
              </v-btn>
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
        
        loginDialog: boolean = false
        registrationDialog: boolean = false

        get getLoginStatus() {
          return this.$store.getters['account/getLoginStatus']
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
    };
</script>

<style scoped>
.v-toolbar__title{
  width: 200px !important;      
  color: white;
}
</style>
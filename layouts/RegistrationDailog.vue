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
          <div class="signin-logo"></div>
          <p class="mt-4 signin-header">Sign up</p>
        </div>

        <!-- input areas -->
        <form @submit.prevent="initiateLogin()">
          <div class="mb-4 d-flex justify-space-center">
            <div class="mr-2 flex-grow-1">
                <input id="" type="text" name="first_name"  placeholder="First Name*" class="text-input">
            </div>
            <div class="ml-2 -grow-1">
                <input id="" type="text" name="last_name" placeholder="Last Name*" class="text-input">
            </div>
          </div>
          <div class="mb-4">
            <input id="" type="email" name="email" placeholder="Email address*" class="text-input">
          </div>
          <div class="mb-6">
            <input id="" type="password" name="password" placeholder="Password*" class="text-input">
          </div>
          <div class="mb-6">
            <input id="" type="password" name="password" placeholder="Confirm Password*" class="text-input">
          </div>
          <div class="mb-6">
            <v-checkbox
              v-model="checkbox"
              :label="`I want to receive inspiration, marketing promotions and updates via email.`"
            ></v-checkbox>
          </div>
          <div class="mb-6">
            <v-btn
              color="green"
              class="btn-100"
              dark
              large
              full
            >
            SIGN UP
            </v-btn>
          </div>
          <div class="d-flex justify-center">
            <div  class="page-link" @click="showLoginModal">Already have an account? Log in</div>
          </div>
        </form>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">

    import { Component, Vue } from 'nuxt-property-decorator'
    @Component({})
    export default class Login extends Vue {
      
      showDialog: boolean = true

      closeDialog(): void {
        this.$emit('close-registration-dialog')
      }

      showLoginModal(): void {
          this.$emit('show-login-dialog')
      }

      async initiateLogin(): Promise<void> {

      }
    };
</script>
<style scoped>
.v-label {
    color: rgb(61, 61, 61);
}
</style>
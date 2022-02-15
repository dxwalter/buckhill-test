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
          <p class="mt-4 signin-header">Log in</p>
        </div>

        <!-- input areas -->
        <form @submit.prevent="initiateLogin()">
          <div class="mb-4">
            <input  id="" type="email" name="email" placeholder="Email address*" class="text-input">
          </div>
          <div class="mb-6">
            <input id="" type="password" name="password" placeholder="Password*" class="text-input">
          </div>
          <div class="mb-6">
            <v-checkbox
              v-model="checkbox"
              :label="`Remember me`"
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
            LOG IN
            </v-btn>
          </div>
          <div class="d-flex justify-space-between">
            <NuxtLink class="page-link" to="/auth/forgot-password">Forgot Password?</NuxtLink>
            <div class="page-link" @click="showRegistrationDialog">Don't have an account? Sign up</div>
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
        this.$emit('close-login-dialog')
      }

      showRegistrationDialog(): void {
        this.$emit('show-registraion-dialog')
      }

      async initiateLogin(): Promise<void> {

      }
    };
</script>
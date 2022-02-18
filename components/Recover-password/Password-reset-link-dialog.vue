<template>
  <v-row justify="center">
    <v-dialog
      v-model="showDialog"
      persistent
      max-width="500px"
    >
      <v-card class="pa-6">

        <div class="d-flex justify-end mb-4">
          <v-btn fab elevation="0" class="pa-2" @click="closeDialog">
            <v-icon white >
              mdi-close
            </v-icon>
          </v-btn>
        </div>

        <v-alert  text type="info" class="mb-8">
            For demo purposes, we are using a URL token
        </v-alert>

        <div class="mb-4">Click on the URL and change your password</div>
        <NuxtLink :to="mainUrl">{{ resetUrl }}</NuxtLink>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">



    import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
    @Component({})
    export default class ForgotPasswordLink extends Vue {

        @Prop({ required: false, type: String, default: '' })
        resetLink!: {};

        resetUrl: string = ''   
        mainUrl: string = ''   
        showDialog: boolean = true
        checkbox: boolean = false

        closeDialog(): void {
            this.$emit('hide-password-link-modal')
        }

        async initiateLogin(): Promise<void> {

        }

        @Watch('resetLink', { immediate: true, deep: true }) checkRecipient(newVal: string) {
          this.resetUrl = `${window.location.origin}/auth/create-password?reset_token=${newVal}`
          this.mainUrl = `/auth/create-password?reset_token=${newVal}`
        }

    };
</script>
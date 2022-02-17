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
        <a :href="resetLink">{{ resetLink }}</a>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'nuxt-property-decorator'
    @Component({})
    export default class ForgotPasswordLink extends Vue {

        @Prop({ required: false, type: String, default: '' })
        resetLink!: {};

        showDialog: boolean = true
        checkbox: boolean = false

        closeDialog(): void {
            this.$emit('hide-password-link-modal')
        }

        async initiateLogin(): Promise<void> {

        }
    };
</script>
<template>
<v-app>
  <v-main>
    <NavigationBar />
    <v-container class="pa-16">
      <div class="rec-password-container">
          <div class="page-header">Recover Password</div>
          <div class="rec-info-text">Enter the email associated with your account and we'll send an email with instructions to reset your password</div>
            <form @submit.prevent="getRecoveryLink()">
                <div class="mb-4">
                    <input id="" v-model="recoveryEmail" type="email" name="email" placeholder="Email address*" class="text-input">
                </div>
                <div class="mb-6">
                    <v-btn
                      id="getRecoveryLink"
                      color="green"
                      class="btn-100"
                      dark
                      large
                      full
                      type="submit"
                    >
                      GET RECOVERY LINK
                      <btn-loader/>
                    </v-btn>
                </div>
            </form>
      </div>
    </v-container>
    <PasswordResetLink 
      v-if="passwordResetLink.length && showDialog"
      :reset-link="passwordResetLink"
      @hide-password-link-modal="hideModal"
    />
    <Footer />
  </v-main>
</v-app>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import NavigationBar from '@/layouts/NavigationBar.vue';
    import Footer from '@/layouts/Footer.vue';
    import PasswordResetLink from '@/components/Recover-password/Password-reset-link-dialog.vue';
    @Component({
      components: {
        NavigationBar,
        Footer,
        PasswordResetLink
      }
    })
    export default class App extends Vue {
      recoveryEmail: string  = '';
      passwordResetLink: string  = '';
      showDialog: boolean = false;
      $toast: any;
      $api: any;

      hideModal(): void {
        this.passwordResetLink = '';
        this.showDialog = false;
      }

      async getRecoveryLink(): Promise<void> {

        this.$startButtonLoader('getRecoveryLink')

        try {
          const getLink = await this.$api.recoverPasswordLink({
            email: this.recoveryEmail
          })
          
          this.passwordResetLink = `${window.location.origin}/auth/create-password?reset_token=${getLink.data.reset_token}`;
          this.showDialog = true

        } catch (error: any) {
          this.$toast.error(error.error || error.message || 'An error occurred')
        }

        this.$stopButtonLoader('getRecoveryLink')
      }
    };
</script>

<style scoped>

</style>
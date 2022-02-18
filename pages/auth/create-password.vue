<template>
<v-app>
  <v-main>
    <NavigationBar />
    <v-container class="pa-16">
      <div class="rec-password-container">
          <div class="page-header">Change Password</div>
          <div class="rec-info-text">Your new passwords must be different from previous passwords.</div>
            <form @submit.prevent="createPassword()">
                <div class="mb-4">
                    <input id="" v-model="email" type="email" name="email" placeholder="Email address*" class="text-input">
                </div>
                <div class="mb-4">
                    <input id="" v-model="newPassword" type="password" name="new_password" placeholder="Password*" class="text-input">
                </div>
                <div class="mb-4">
                    <input  id="" v-model="confirmNewPassword" type="password" name="confirm_password" placeholder="Re-enter new password*" class="text-input">
                </div>
                <div class="mb-6">
                    <v-btn
                      id="createPassword"
                      color="green"
                      class="btn-100"
                      dark
                      large
                      full
                      type="submit"
                    >
                      CHANGE PASSWORD
                      <btn-loader/>
                    </v-btn>
                </div>
            </form>
      </div>
    </v-container>
    <Footer />
  </v-main>
</v-app>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import NavigationBar from '@/layouts/NavigationBar.vue';
    import Footer from '@/layouts/Footer.vue';
    @Component({
      components: {
        NavigationBar,
        Footer,
      }
    })
    export default class CreateNewPassword extends Vue {

      resetToken: string = "" 
      newPassword: string = ""
      confirmNewPassword: string = ""
      email: string = ''
      $toast: any;
      $api: any;

      async createPassword(): Promise<void> {

        if (!this.email.length) {
          return this.$toast.error('Enter a valid email address')
        }

        if (this.newPassword.length < 8) {
          return this.$toast.error('Your password must be at least 8 characters ')
        }

        if (this.newPassword !== this.confirmNewPassword) {
          return this.$toast.error('Your passwords are not identical')
        }

        this.$startButtonLoader('createPassword')

        try {
          const request = await this.$api.resetPassword({
            token: this.resetToken,
            email: this.email,
            password: this.newPassword,
            password_confirmation: this.confirmNewPassword
          });

          this.$toast.success(request.data.message)
          
        } catch (error: any) {
          this.$toast.error(error.error || error.message || 'An error occurred')
        }

        this.$stopButtonLoader('createPassword')
      }

      created() {
          if (process.browser) {
            const tokenUrl: string = this.$route.query.reset_token as unknown as string
            if (tokenUrl !== undefined && tokenUrl !== null && tokenUrl.length !== 0) {
              this.resetToken = tokenUrl
            }
          }
        }
    };
</script>

<style scoped>

</style>
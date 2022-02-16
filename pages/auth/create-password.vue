<template>
<v-app>
  <v-main>
    <NavigationBar />
    <v-container class="pa-16">
      <div class="rec-password-container">
          <div class="page-header">Change Password</div>
          <div class="rec-info-text">Your new passwords must be different from previous passwords.</div>
            <form @submit.prevent="initiateLogin()">
                <div class="mb-4">
                    <input  id="" type="password" name="new_password" placeholder="Password*" class="text-input">
                </div>
                <div class="mb-4">
                    <input  id="" type="password" name="confirm_password" placeholder="Re-enter new password*" class="text-input">
                </div>
                <div class="mb-6">
                    <v-btn
                    color="green"
                    class="btn-100"
                    dark
                    large
                    full
                    >
                    CHANGE PASSWORD
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
    export default class App extends Vue {

    };
</script>

<style scoped>

</style>
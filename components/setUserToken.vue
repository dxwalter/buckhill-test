<template>
    <div></div>
</template>
<script lang="ts">

    import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
    import { UserData } from '../types'
    @Component({})
    export default class StoreUserData extends Vue {

        @Prop({ required: false, type: Object, default: {} })
        userData!: {};

        $api: any;
        $cookies: any;

        @Watch('userData', { immediate: true, deep: true }) checkRecipient(newVal: UserData) {
            
            this.$api.setToken(newVal.token)
            this.$store.dispatch('account/saveUserData', newVal)
            this.$store.dispatch('account/saveUserLoginStatus', true)
            this.$cookies.set('token', newVal.token, {
            path: '/',
            expires: new Date(Date.now() + 60 * 60 * 2 * 1000),
            })
        }
            

    };
</script>
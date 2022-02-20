<template>
    <div class="footer-container">
        <v-container>
        <div class="inner-container">

            <div class="footer-content">
                <div class="footer-logo mr-16">
                    <img src="/images/green-logo.svg" alt="" srcset="">
                    <div class="footer-logo-name">Petson.</div>
                </div> 
                
                <div class="footer-section mr-10">
                    <div class="heading">Petson</div>
                    <div class="footer-link"><NuxtLink to="#">About us</NuxtLink></div>
                    <div class="footer-link"><NuxtLink to="#">Blog</NuxtLink></div>
                    <div class="footer-link"><NuxtLink to="#">Store Locator</NuxtLink></div>
                </div> 
                
                <div class="footer-section mr-10">
                    <div class="heading">Contact</div>
                    <div class="footer-link"><NuxtLink to="#">contact@petson.com</NuxtLink></div>
                    <div class="footer-link"><NuxtLink to="#">+385 000 000</NuxtLink></div>
                    <div class="footer-link"><NuxtLink to="#">35 Shnuazer avenue, Dogville AL</NuxtLink></div>     
                </div> 

                <div class="footer-section mr-10">
                    <div class="heading">Information</div>
                    <div class="footer-link"><NuxtLink to="#">Ordering and shipping</NuxtLink></div>
                    <div class="footer-link"><NuxtLink to="#">FAQ</NuxtLink></div>
                    <div class="footer-link"><NuxtLink to="#">GDPR statement</NuxtLink></div>    
                </div> 

                <div class="footer-section footer-sec-mod">
                    <p>If you can't find answer to your question, please contact our <NuxtLink to="#">customer service</NuxtLink></p>
                </div>
            </div>
        </div>
        </v-container>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    @Component({})
    export default class Login extends Vue {}

</script>
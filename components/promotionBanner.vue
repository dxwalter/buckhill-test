<template>
    <div class="promotion-banner-container">
        <div class="promotion-overlay">
            <div class="promotion-title">{{ promotionTitle }}</div>
            <div class="promotion-content">{{ promotionContent }}</div>
        </div>
        <img id="promotionBanner" src="">
    </div>
</template>
<script lang="ts">
// import { Buffer } from 'buffer';
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { LatestPromotion, getImageStatus } from '../types';

@Component
export default class PromotionBanner extends Vue {
    @Prop({ required: false, type: Object, default: {} })
    promotionData!: {};
    
    promotionTitle: string = ''
    promotionContent: string = ''
    $toast: any;

    async getImageFile(uuid: string) {
        const getImage: getImageStatus =  await this.$getImageFIle(uuid, 'promotionBanner')
        if (!getImage.status) {
            this.$toast.error(getImage.message)
        }
    }

    @Watch('promotionData', { immediate: true, deep: true }) setUpBanner(newVal: LatestPromotion) {
        this.getImageFile(newVal.metadata.image)
        this.promotionTitle = newVal.title
        this.promotionContent = newVal.content
    }
}
</script>
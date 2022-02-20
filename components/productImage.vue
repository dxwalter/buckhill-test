<template>
    <div class="product-image-area">
        <img :id="`productImage${productId}`" src="" alt="" srcset="">
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { getImageStatus } from '../types'
@Component
export default class ProductImage extends Vue {
    
    @Prop({ required: false, type: Object, default: {} })
    imageData!: {};

    productId: string = '';
    imageId: string = ''
    $toast: any;

    async getImageFile(uuid: string) {
        const getImage: getImageStatus =  await this.$getImageFIle(uuid, `productImage${this.productId}`)
        if (!getImage.status) {
            this.$toast.error(getImage.message)
        }
    }

    @Watch('imageData', { immediate: true, deep: true }) checkRecipient(newVal: {
        productId: string,
        imageId: string
    }) {
        this.productId = newVal.productId
        this.getImageFile(newVal.imageId)
    }
}
</script>

<style scoped>
.order-page {
    order: 2;
}
</style>
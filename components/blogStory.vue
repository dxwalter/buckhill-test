<template>
    <div class="blog-header-banner" :class="[orderLayout ? 'order-page' : '']">
        <div class="blog-image-area">
            <img :id="`blogImage${orderLayout ? 1 : 0}`" src="" alt="" srcset="">
        </div>
        <div class="blog-action-area">
            <div class="blog-tite">{{ postContent.title }}</div>
            <NuxtLink to="#" class="blog-link">Learn more</NuxtLink>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import { BlogPost, getImageStatus } from '../types'

@Component
export default class BlogStory extends Vue {
    @Prop({ required: false, type: Object, default: {} })
    blogPost!: {};

    orderLayout: boolean = false;
    postContent: BlogPost = {
        uuid: '',
        slug: '',
        content: '',
        title: '',
        metadata: {
            image: '',
            author: ''
        },
        created_at: '',
        updated_at: ''
    }

    $toast: any;

    async getImageFile(uuid: string) {
        const getImage: getImageStatus =  await this.$getImageFIle(uuid, `blogImage${this.orderLayout ? 1 : 0}`)
        if (!getImage.status) {
            this.$toast.error(getImage.message)
        }
    }

    @Watch('blogPost', { immediate: true, deep: true }) setUpPost(newValue: {
        swap: boolean,
        post: BlogPost
    }) {
        this.orderLayout = newValue.swap
        this.postContent = newValue.post
        this.getImageFile(newValue.post.metadata.image)
    }
}
</script>

<style scoped>
.order-page {
    order: 2;
}
</style>
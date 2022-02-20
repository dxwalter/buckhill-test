/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
// @ts-ignore
import { BlogPost, getImageStatus } from '../types';
import api from '../api'
declare module 'vue/types/vue' {
  interface Vue {
    $startButtonLoader(target: string): void
    $stopButtonLoader(target: string): void
    $getRandomBlogPost(blogPosts: BlogPost[]): BlogPost[]
    $getImageFIle(uuid: string, target: string): getImageStatus
  }
}

const plugin = Vue.prototype

plugin.$getRandomBlogPost = (posts: BlogPost[]): BlogPost[] => {
  return JSON.parse(JSON.stringify(posts)).sort(() => .5 - Math.random()).slice(0, 2);
}

plugin.$startButtonLoader = (target: string) => {
  const element: HTMLInputElement = document.getElementById(
    target
  ) as HTMLInputElement
  if (element !== null) element.disabled = true
}

plugin.$stopButtonLoader = (target: string) => {
  const element: HTMLInputElement = document.getElementById(
    target
  ) as HTMLInputElement
  if (element !== null) element.disabled = false
}

plugin.$getImageFIle = async (uuid: string, target: string) => {
  try {
    const getImage = await api.getImageFile(uuid)
    const imageId: HTMLInputElement = document.getElementById(`${target}`) as HTMLInputElement;
    imageId.src = URL.createObjectURL(getImage)
    
    return {
      status: true,
    }
  } catch (error) {
    return {
      status: false,
      message: error
    }
  }
}
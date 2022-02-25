/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
// @ts-ignore
import { BlogPost, getImageStatus } from '../types'
import api from '../api'
declare module 'vue/types/vue' {
  interface Vue {
    $startButtonLoader(target: string): void
    $stopButtonLoader(target: string): void
    $getRandomBlogPost(blogPosts: BlogPost[]): BlogPost[]
    $getImageFIle(uuid: string, target: string): getImageStatus
    $capitalizeString(value: string): string
  }
}

const plugin = Vue.prototype

plugin.$capitalizeString = (value: string) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

plugin.$getRandomBlogPost = (posts: BlogPost[]): BlogPost[] => {
  return JSON.parse(JSON.stringify(posts))
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
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
    const imageId: HTMLInputElement = document.getElementById(
      `${target}`
    ) as HTMLInputElement
    const src = URL.createObjectURL(getImage)
    imageId.src = src

    return {
      status: true,
      src,
    }
  } catch (error) {
    return {
      status: false,
      message: error,
    }
  }
}

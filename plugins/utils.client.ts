/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
// @ts-ignore

declare module 'vue/types/vue' {
  interface Vue {
    $startButtonLoader(target: string): void
    $stopButtonLoader(target: string): void
  }
}

const plugin = Vue.prototype


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

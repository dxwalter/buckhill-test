/* eslint-disable no-console */
export default function ({ app, redirect }) {
    if (!process.server) {
      if (app.context.app.$cookies.get('token')) {
        return redirect('/')
      }
    }
  }
  
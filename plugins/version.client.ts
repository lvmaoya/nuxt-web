export default defineNuxtPlugin(() => {
  const { public: { version } } = useRuntimeConfig()
  const nuxtApp = useNuxtApp()
  const print = () => console.log(`[Version] ${version}`)
  nuxtApp.provide('printVersion', print)
  nuxtApp.hooks.hook('app:mounted', print)
})

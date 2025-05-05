export default defineNuxtPlugin(() => {
  const activeMenu = ref('');
  
  return {
    provide: {
      activeMenu
    }
  }
})
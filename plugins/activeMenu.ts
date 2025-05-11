export default defineNuxtPlugin(() => {
  const activeMenu = ref(0);
  
  const setActiveMenu = (menu: number) => {
    activeMenu.value = menu;
  }
  
  return {
    provide: {
      activeMenu,
      setActiveMenu
    }
  }
})
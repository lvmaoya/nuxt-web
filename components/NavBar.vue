<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="nav-bar inner">
      <Logo></Logo>
      <nav class="menu active-menu">
        <ul>
          <li>
            <NuxtLink to="/" active-class="active-nav-link" @click.stop :class="{ 'active-nav-link': $activeMenu == 1 }"
              >Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/work" active-class="active-nav-link" @click.stop :class="{ 'active-nav-link': $activeMenu == 2 }">Study</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog" active-class="active-nav-link" @click.stop :class="{ 'active-nav-link': $activeMenu == 3 || $activeMenu == 4 }">Blog</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" active-class="active-nav-link" @click.stop :class="{ 'active-nav-link': $activeMenu == -1 }">About</NuxtLink>
          </li>
        </ul>
      </nav>
      <NavMiniScreenPage class="miniScreen activeMiniScreen"></NavMiniScreenPage>
    </div>
  </header>
</template>

<script setup lang="ts">
import { throttle } from "@/utils/throttle"
const isScrolled = ref(false)
const { $activeMenu, $setActiveMenu } = useNuxtApp()
onMounted(() => {
  window.addEventListener('scroll', throttle(function () {
    let bodyScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (bodyScrollTop) {
      isScrolled.value = true
    } else {
      isScrolled.value = false
    }
  }, 100))
});
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 518;
  padding: 35px 0;
  background: transparent;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  transition: padding 0.4s, background 0.2s, box-shadow;

  .nav-bar {
    width: 100%;
    height: 100%;
    display: flex;

    nav {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      ul {
        display: flex;

        li {
          max-width: 70px;
          padding: 0 10px;
          list-style: none;

          a {
            font-size: 0.875em;
            transition: color .2s linear;

            &:hover {
              color: #333;
            }
          }
        }
      }
    }

    .miniScreen {
      display: none;
    }
  }

  .active-nav-link {
    color: #333 !important;
  }
}

.scrolled {
  padding: 23px 0;
  background: #fff;
  -webkit-box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 450px) {
  header .nav-bar .activeMiniScreen {
    display: flex;
  }

  header .nav-bar .active-menu {
    display: none;
  }

  header {
    padding: 23px 0;
  }
}
</style>

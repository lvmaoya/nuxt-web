<!--
 * @Author: sun
 * @Date: 2022-12-27 15:02:34
 * @LastEditTime: 2023-01-04 16:04:20
 * @Description: Do not edit
-->
<template>
  <div class="home">
    <div class="home-title">
      Welcome to Sun's blog!
    </div>
    <div class="home-sub-title">I'am a frontEnd developer</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 21;
  text-align: center;
  padding-top: 38vh;
  box-sizing: border-box;
  background-color: #fff;

  .home-title {
    font-size: 2em;
    font-family: Georgia, "Helvetica Neue", Times, serif;
    user-select: none;
  }

  .home-sub-title {
    font-family: Georgia, "Helvetica Neue", Times, serif;
    font-style: italic;
    font-size: 1.3em;
    padding: 15px;
    user-select: none;
  }
}
</style>

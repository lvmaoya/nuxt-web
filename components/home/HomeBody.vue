<!--
 * @Author: sun
 * @Date: 2022-12-27 15:02:34
 * @LastEditTime: 2023-01-04 16:04:20
 * @Description: Do not edit
-->
<template>
  <div class="homeBg">
    <span class="welcomeStr">
      {{ welcomeStr }}
    </span>
    <div class="introduce">I'am a frontEnd developer</div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["startClick"]);
let welcomeStr = ref("Welcome to Sun's blog!");
</script>

<style lang="scss" scoped>
.homeBg {
  width: 100%;
  height: 100vh;
  color: black;
  position: relative;
  z-index: 21;
  /* display: flex; */
  /* align-items: center; */
  text-align: center;
  padding-top: 38vh;
  box-sizing: border-box;
  background-color: #fff;

  .welcomeStr {
    font-size: 2em;
    font-family: Georgia, "Helvetica Neue", Times, serif;
    user-select: none;
  }

  .introduce {
    font-family: Georgia, "Helvetica Neue", Times, serif;
    font-style: italic;
    font-size: 1.3em;
    padding: 15px;
    user-select: none;
  }

  .button {
    padding-top: 100px;

    .buttonA {
      position: relative;
      display: inline-block;
      padding: 1.2em 2em;
      text-decoration: none;
      text-align: center;
      cursor: pointer;
      user-select: none;
      color: white;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        border-radius: 4px;
        transition: box-shadow 0.5s ease, transform 0.2s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      &:hover::before {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }

      &::after {
        position: relative;
        display: inline-block;
        content: attr(data-title);
        transition: transform 0.2s ease;
        font-weight: bold;
        letter-spacing: 0.01em;
      }
    }
  }
}
</style>

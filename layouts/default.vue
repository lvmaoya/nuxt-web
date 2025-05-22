<template>
  <div id="container">
    <NavBar></NavBar>
    <slot></slot>
    <Footer>
      <p><a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2024068051号-1</a></p>
    </Footer>

  </div>
  <GoutouBack></GoutouBack>
</template>

<script setup>
import 'animate.css';
</script>
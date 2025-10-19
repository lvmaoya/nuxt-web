<template>
  <div class="inner">
    没有找到页面！
    <a href="/" class="back-home">返回首页</a>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
div {
  border-bottom: 1px solid var(--primary-border-color);
  height: 100vh;
  padding-top: 150px;
  margin-bottom: 258px;
  background-color: #fff;
  position: relative;
  z-index: 21;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
}

.back-home {
  font-size: var(--text-font-size);
  color: var(--primary-title-color);
  border-bottom: 1px solid var(--primary-title-color);
}
</style>

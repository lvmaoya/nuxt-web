<!--
 * @Author: sun
 * @Date: 2023-01-02 21:47:02
 * @LastEditTime: 2023-01-02 21:56:41
 * @Description: Do not edit
-->
<template>
  <div class="empty">
    <span>暂时木有内容哦</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.empty {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20vh 0 60vh 0;

  span {
    color: #666;
    user-select: none;
    font-size: 14px;
  }
}
</style>

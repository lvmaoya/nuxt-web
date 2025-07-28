<!--
 * @Author: sun
 * @Date: 2023-01-02 21:47:02
 * @LastEditTime: 2023-01-02 21:56:41
 * @Description: Do not edit
-->
<template>
  <div class="empty">
    <span v-if="props.loading">加载中...</span>
    <span v-else>暂时木有内容哦</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  loading: {
    required: false,
    type: Boolean,
  }
});
</script>

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

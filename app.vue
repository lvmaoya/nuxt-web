<template>
  <lenis>
    <NuxtLayout>
      <Cat></Cat>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </lenis>
</template>
<script setup>
console.log("%c Welcome to my blog!", "background:#fff; padding:16px 3px; font-size:20px;font-weight:600;");
// 启动心跳
let heartbeatTimer = null
const startHeartbeat = () => {
  stopHeartbeat()
  // 立即发送一次
  sendHeartBeat()
  // 每5分钟发送一次
  heartbeatTimer = setInterval(sendHeartBeat, 10000)
}

// 停止心跳
const stopHeartbeat = () => {
  if (heartbeatTimer) {
    clearInterval(heartbeatTimer)
    heartbeatTimer = null
  }
}
onMounted(() => {
  startHeartbeat()
})
onBeforeUnmount(() => {
  stopHeartbeat()
})
</script>
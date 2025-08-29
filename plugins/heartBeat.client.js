export default defineNuxtPlugin(() => {
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
  startHeartbeat()
})
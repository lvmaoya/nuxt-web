<template>
  <div id="container">
    <NavBar></NavBar>
    <slot></slot>
    <Footer></Footer>
    <ClientOnly>
        <ChatWidget botName="Lvmaoya" endpointUrl="http://localhost:8080/h5/chat/rag/stream" :greetings="['您好，请问有什么可以帮到您？']" :questions="[]" placeholder="请输入您的问题" />
    </ClientOnly>
  </div>
</template>

<script setup>
import 'animate.css';
import { ChatWidget } from '@lvmaoya/chat-bot'
</script>
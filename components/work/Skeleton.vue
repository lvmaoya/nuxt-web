<template>
    <div class="blog-list-skeleton">
      <!-- 文章项骨架 - 模仿图片中的6篇文章 -->
      <div v-for="i in 6" :key="i" class="skeleton-item">
        <!-- 分类标签 -->
        <div class="skeleton-category"></div>
        
        <!-- 标题 -->
        <div class="skeleton-title"></div>
        
        <!-- 描述 -->
        <div class="skeleton-desc"></div>
        
        <!-- 底部元信息 -->
        <div class="skeleton-meta">
          <div class="skeleton-date"></div>
          <div class="skeleton-views"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // 不需要props，因为是固定样式的骨架屏
  </script>
  
  <style scoped>
  .blog-list-skeleton {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .skeleton-item {
    margin-bottom: 30px;
    padding-bottom: 20px;
    /* border-bottom: 1px solid #f0f0f0; */
  }
  
  .skeleton-category {
    width: 100px;
    height: 13px;
    margin-bottom: 12px;
    background: linear-gradient(90deg, #f9f9f9 25%, #f2f2f2 50%, #f9f9f9 75%);
    background-size: 200% 100%;
    animation: shimmer 6s infinite;
    border-radius: 4px;
  }
  
  .skeleton-title {
    width: 70%;
    height: 20px;
    margin-bottom: 12px;
    background: linear-gradient(90deg, #f9f9f9 25%, #f2f2f2 50%, #f9f9f9 75%);
    background-size: 200% 100%;
    animation: shimmer 6s infinite;
    border-radius: 4px;
  }
  
  .skeleton-desc {
    width: 90%;
    height: 16px;
    margin-bottom: 12px;
    background: linear-gradient(90deg, #f9f9f9 25%, #f2f2f2 50%, #f9f9f9 75%);
    background-size: 200% 100%;
    animation: shimmer 6s infinite;
    border-radius: 4px;
  }
  
  .skeleton-meta {
    display: flex;
    align-items: center;
  }
  
  .skeleton-date {
    width: 120px;
    height: 13px;
    margin-right: 20px;
    background: linear-gradient(90deg, #f9f9f9 25%, #f2f2f2 50%, #f9f9f9 75%);
    background-size: 200% 100%;
    animation: shimmer 6s infinite;
    border-radius: 4px;
  }
  
  .skeleton-views {
    width: 80px;
    height: 12px;
    background: linear-gradient(90deg, #f9f9f9 25%, #f2f2f2 50%, #f9f9f9 75%);
    background-size: 200% 100%;
    animation: shimmer 6s infinite;
    border-radius: 4px;
  }
  
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  </style>
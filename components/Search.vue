<template>
  <div class="search" @click.stop>
    <div class="search-input">
      <input
        type="text"
        placeholder="Search..."
        v-model="searchData"
        @keyup.enter="handleSearchBtnClick"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <button @click="handleSearchBtnClick">
        <svg
          t="1760410442281"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4572"
          width="24"
          height="24"
        >
          <path
            d="M454.528 64a390.528 390.528 0 0 1 315.2 620.992 40.832 40.832 0 0 1 2.752 2.56l169.92 169.92a60.096 60.096 0 1 1-84.928 84.928L687.488 772.48l-2.496-2.752A390.528 390.528 0 1 1 454.464 64z m0 60.096a330.432 330.432 0 1 0 227.2 570.24 60.544 60.544 0 0 1 12.544-12.736 330.432 330.432 0 0 0-239.808-557.632z"
            fill="#999999"
            p-id="4573"
          ></path>
        </svg>
      </button>
    </div>
    <div class="condition-container" :class="{ isfocused: isFocused }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["searchBtnClick"]);

// 定义焦点状态的响应式变量
const isFocused = ref(false);
// 处理获取焦点事件
const handleFocus = () => {
  isFocused.value = true;
};

// 处理失去焦点事件
const handleBlur = () => {
  isFocused.value = false;
};
const searchData = ref("");
const handleSearchBtnClick = () => {
  isFocused.value = false;
  emit("searchBtnClick", searchData.value);
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .search input {
    font-size: 18.5px;

    &::placeholder {
      font-size: 16px;
    }
  }
}
.search {
  width: 100%;
  max-width: 770px;
  margin: 0 auto;
  position: relative;

  .search-input {
    position: relative;
    width: 100%;
    height: 45px;

    input {
      width: 100%;
      height: 100%;
      border-radius: 42px;
      border: 1px solid rgba(184, 197, 214, 0.2);
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0 1px 4px rgb(0 0 0 / 4%);
      padding: 0 45px 0 16px;
      user-select: none;
      font-size: 14px;
      color: #333;
    }
    input:focus {
      outline: none;
    }

    button {
      height: 100%;
      width: 45px;
      position: absolute;
      background: none;
      aspect-ratio: 1/1;
      border: none;
      border-radius: 50%;
      padding: 0;
      right: 4px;
    }
  }

  .condition-container {
    width: 100%;
    margin-top: 12px;
    border-radius: 16px;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(28, 31, 35, 0.03),
      0 16px 48px 8px rgba(28, 31, 35, 0.08);
    transition: all 0.3s;
    transform: translateY(calc(-12px)) rotateX(20deg);
    opacity: 0;
    z-index: -1;
  }

  .isfocused {
    transform: translateY(0%) rotateX(0deg);
    opacity: 1;
    z-index: 99999;
  }
}
</style>

<template>
  <div class="search" @click.stop>
    <div class="search-input">
      <input type="text" placeholder="Search..." v-model="searchData"
        @keyup.enter="handleSearchBtnClick" @focus="handleFocus" @blur="handleBlur"/>
      <button @click="handleSearchBtnClick">
        <span class="iconfont">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo1"></use>
          </svg>
        </span>
      </button>
    </div>
    <div class="condition-container" :class="{ 'isfocused': isFocused }">
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
  emit("searchBtnClick", searchData.value );
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .search input  {
    font-size: 18.5px;

    &::placeholder{
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
    box-shadow: 0 2px 8px rgba(28, 31, 35, .03), 0 16px 48px 8px rgba(28, 31, 35, .08);
    transition: all .3s;
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

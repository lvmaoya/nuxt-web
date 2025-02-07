<template>

  <ul class="category">
    <li>
      <span>分类</span>
    </li>
    <li v-for="item in categoryList" :key="item.category_id" @click.stop="handleCategoryClick(item.category_id)">
      <a > {{ item.category_name }}  ({{ item.count ?? 0 }})</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { CategoryItemType } from "~~/composables";
const emit = defineEmits(["categoryTagClick"]);

const handleCategoryClick = (val: number) => {
  emit("categoryTagClick", val);
};
// 页面类别
let fatherPageCategory = "tech_article";
// 文章类别列表
let categoryList = ref<Array<CategoryItemType>>();

categoryList.value = (await getArticleCategoryList({ category: fatherPageCategory })).data.categoryList;
</script>

<style scoped lang="scss">
.category {
  border: 1px solid #dbdbdb;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 12px;
  margin-bottom: 16px;
  width: 240px;
  height: fit-content;
  li{
    list-style-position: inside;
    width: fit-content;
    padding: 6px 0;
    width: 100%;
    &:first-child {
      font-size: 16px;
      margin-bottom: 10px;
      list-style: none;
      border-bottom: 1px solid #dbdbdb;
    }
  }
  a {
    font-size: 14px;
    list-style: circle;
    color: #333;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>

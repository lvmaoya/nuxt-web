<template>
  <div class="container">
    <div class="title">
      文章分类
    </div>
    <ul class="category">
      <li @mousedown="handleCategoryClick(-1)">
        <a>全部</a>
      </li>
      <li v-for="item in categoryList" :key="item.category_id" @mousedown.stop="handleCategoryClick(item.category_id)">
        <a> {{ item.category_name }} ({{ item.count ?? 0 }})</a>
      </li>
    </ul>
    <div class="title" style="margin-top: 20px;">
      更新时间(暂不支持)
    </div>
    <ul class="category">
      <li @mousedown="handleCategoryClick(-1)">
        <a>全部</a>
      </li>
      <li v-for="item in dateRange" :key="item.label" @mousedown.stop="">
        <a> {{ item.label }} </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { type CategoryItemType } from "~~/composables";

const emit = defineEmits(["categoryTagClick", "dateRangeClick"]);

const handleCategoryClick = (val: number) => {
  emit("categoryTagClick", val);
};
const handleDateRangeClick = (val: any) => {
  emit("dateRangeClick", val);
};
// 页面类别
let fatherPageCategory = "tech_article";
// 文章类别列表
let categoryList = ref<Array<CategoryItemType>>();

categoryList.value = (await getArticleCategoryList(2)).data.records;

const dateRange = ref([
  {
    label: "最近一周",
    start: dayjs().subtract(7, 'day'),
    end: dayjs()
  },
  {
    label: "最近一个月",
    start: dayjs().subtract(1, 'month'),
    end: dayjs()
  },
  {
    label: "最近三个月",
    start: dayjs().subtract(3, 'month'),
    end: dayjs()
  },
  {
    label: "本月",
    start: dayjs().startOf('month'),
    end: dayjs().endOf('month')
  },
  {
    label: "今年",
    start: dayjs().startOf('year'),
    end: dayjs().endOf('year')
  }
]);

</script>

<style scoped lang="scss">
.container {
  padding: 20px 16px;

  .title {
    font-size: 14px;
    color: black;
    margin-bottom: 6px;
    font-weight: 600;
  }

  .category {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    border-radius: 12px;
    height: fit-content;

    li {
      padding: 6px 8px;
      list-style: none;
      border-radius: 4px;

      &:hover {
        // background-color: #999;

        a {
          // color: white;
          text-decoration: underline;
          // text-decoration-style: dashed;
        }
      }
    }

    a {
      font-size: 12px;
      display: block;
      color: #333;
      cursor: pointer;
    }
  }
}
</style>

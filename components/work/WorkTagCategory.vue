<template>
  <div class="container">
    <div class="title">
      文章分类
    </div>
    <ul class="category">
      <li @mousedown="handleCategoryClick(-1)">
        <a>全部</a>
      </li>
      <li v-for="item in categoryList" :key="item.id" @mousedown.stop="handleCategoryClick(item.id)">
        <a> {{ item.categoryName }} ({{ item.count ?? 0 }})</a>
      </li>
    </ul>
    <div class="title" style="margin-top: 20px;">
      更新时间
    </div>
    <ul class="category">
      <li @mousedown="handleDateRangeClick(-1)">
        <a>全部</a>
      </li>
      <li v-for="item in dateRange" :key="item.label"
        @mousedown.stop="handleDateRangeClick({ publishedStart: item.start, publishedEnd: item.end })">
        <a> {{ item.label }} </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { type BlogType, type CategoryType } from "~~/composables";
const emit = defineEmits(["categoryTagClick", "dateRangeClick"]);

const handleCategoryClick = (val: number) => {
  emit("categoryTagClick", val);
};
const handleDateRangeClick = (val: any) => {
  emit("dateRangeClick", val);
};

// 文章类别列表
let categoryList = ref<Array<CategoryType>>();

const dateRange = ref([
  {
    label: "最近一周",
    start: dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    label: "最近一个月",
    start: dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    label: "最近三个月",
    start: dayjs().subtract(3, 'month').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  {
    label: "本月",
    start: dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss')
  },
  {
    label: "今年",
    start: dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
    end: dayjs().endOf('year').format('YYYY-MM-DD HH:mm:ss')
  }
]);
// 获取分类列表并计算每个分类的文章数量
const initCategoryList = async () => {
  let categories = categoryList.value ?? (await getCategoryList({ fatherCategoryId: 2 })).data;
  categoryList.value = categories.filter(item => item.id != item.fatherCategoryId);
};
initCategoryList();
</script>

<style scoped lang="scss">
.container {
  padding: 20px 16px;

  .title {
    font-size: var(--text-font-size);
    margin-bottom: 4px;
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
        a {
          text-decoration: underline;
        }
      }
    }

    a {
      font-size: 12px;
      display: block;
      color: var(--primary-text-color);
      cursor: pointer;
    }
  }
}
</style>

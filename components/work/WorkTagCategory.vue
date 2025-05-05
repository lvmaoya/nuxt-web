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
// 定义 props 接收文章列表
const props = defineProps<{
  articleList?: Array<BlogType>  // 根据实际文章类型定义
}>();
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
    start: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD')
  },
  {
    label: "最近一个月",
    start: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD')
  },
  {
    label: "最近三个月",
    start: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD')
  },
  {
    label: "本月",
    start: dayjs().startOf('month').format('YYYY-MM-DD'),
    end: dayjs().endOf('month').format('YYYY-MM-DD')
  },
  {
    label: "今年",
    start: dayjs().startOf('year').format('YYYY-MM-DD'),
    end: dayjs().endOf('year').format('YYYY-MM-DD')
  }
]);
// 获取分类列表并计算每个分类的文章数量
const initCategoryList = async () => {
  if(categoryList.value) return;
  const categories = (await getCategoryList({ fatherCategoryId: 2 })).data;

  if (props.articleList && categories && props.articleList) {
    categories.forEach(category => {
      category.count = props.articleList?.filter(article => article.categoryId === category.id).length;
    });
  }
  categoryList.value = categories;
};

// 监听文章列表变化，重新计算分类数量
watch(() => props.articleList, (newVal, oldVal) => {
  initCategoryList();
}, { deep: true, immediate: true });
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

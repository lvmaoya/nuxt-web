<template>
  <div class="blog-content">
    <div class="inner">
      <div class="search-content">
        <Search @searchBtnClick="handleSearchBtnClick"></Search>
      </div>
      <BlogContent :blogList="blogList"></BlogContent>
      <NoData v-if="total === 0"></NoData>
    </div>
    <Pagination @currentPageChange="handleCurrentPageChange" :current-page="currentPage" :total="total" :size="size">
    </Pagination>
  </div>
</template>

<script lang="ts" setup>;
useHead({
  title: "lvmaoya"
});
import { type BlogType } from "~~/composables";

let blogList = ref<Array<BlogType>>([]);
// 分页
let currentPage = ref(1);
let total = ref(0);
let size = ref(999);
let blogData = (await getBlogList({ page: currentPage.value, size: size.value, fatherCategoryIds: [3, 4] })).data;
blogList.value = blogData.records;
total.value = blogData.total;

const keywords = ref('');

const handleCurrentPageChange = async (val: number) => {
  if (val === 0) {
    currentPage.value -= 1;
  } else if (val === 1) {
    currentPage.value += 1;
  }
  getData();
};
const handleSearchBtnClick = async (searchData: string) => {
  keywords.value = searchData;
  currentPage.value = 1;
  getData();
};
const getData = async () => {
  blogData = (await getBlogList({ page: currentPage.value, size: size.value, keywords: keywords.value, fatherCategoryIds: [3, 4] })).data;
  blogList.value = blogData.records;
  total.value = blogData.total;
}
</script>

<style scoped lang="scss">
.blog-content {
  margin-bottom: 258px;
  background-color: #fff;
  position: relative;
  z-index: 21;
}

.search-content {
  padding: 25vh 0 9vh 0;
}
</style>

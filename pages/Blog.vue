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

const handleCurrentPageChange = async (val: number) => {
  if (val === 0) {
    currentPage.value -= 1;
  } else if (val === 1) {
    currentPage.value += 1;
  }
  switch (doCategory.value) {
    case 1:
      blogData = (await getBlogList({ page: currentPage.value, size: size.value })).data;
      blogList.value = blogData.records;
      total.value = blogData.total;
      break;
    case 2:
      blogData = (await getBlogList(userInput.value)).data;
      blogList.value = blogData.records;
      total.value = blogData.total;
      break;
  }
};
const doCategory = ref(1);
const userInput = ref<Object>();
const handleSearchBtnClick = async (searchData: Object) => {
  doCategory.value = 2;
  currentPage.value = 1;
  searchData = { ...searchData, currentPage: currentPage.value, size: size.value };
  userInput.value = searchData;
  const resArticlesData = await getBlogList(searchData);
  blogList.value = resArticlesData.data.records;
  total.value = resArticlesData.data.total;
};
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

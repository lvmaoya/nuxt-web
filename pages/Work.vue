<template>
  <div class="work-content">
    <div class="inner">
      <div class="work-controller">
        <Search @search-btn-click="handleSearchBtnClick">
          <WorkTagCategory @category-tag-click="categoryTagClick" @date-range-click="dateRangeClick"></WorkTagCategory>
        </Search>
      </div>
      <WorkContent :list="articleList" :loading="loading"></WorkContent>
    </div>
    <Pagination :current-page="currentPage" :total="total" :size="size" @currentPageChange="handleCurrentPageChange">
    </Pagination>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Work - lvmaoya"
});
// 分页
let currentPage = ref(1);
let total = ref(0);
let size = ref(100);
let loading = ref(false);
// 文章列表数据
let articleList = ref<Array<BlogType>>([]);

const getArticles = async (params: any = {}) => {
  loading.value = true;
  let res = (await getBlogList({ page: currentPage.value, size: size.value, ...params, fatherCategoryId: 2 })).data;
  articleList.value = res.records;
  total.value = res.total;
  loading.value = false;
}
getArticles();

// 点击分类标签
const categoryTagClick = async (val: number) => {
  currentPage.value = 1;
  getArticles({ categoryId: val == -1 ? null : val });
};
const dateRangeClick = async (val: any) => {
  currentPage.value = 1;
  getArticles(val == -1 ? null : val);
};
// 点击搜索按钮
const handleSearchBtnClick = async (searchData: String) => {
  currentPage.value = 1;
  getArticles(searchData ? { keywords: searchData } : null);
};
const handleCurrentPageChange = async (val: number) => {
  if (val === 0 && currentPage.value > 1) {
    currentPage.value -= 1;
  } else if (val === 1) {
    currentPage.value += 1;
  }
  getArticles();
};
</script>

<style scoped lang="scss">
.work-content {
  margin-bottom: 258px;
  background-color: #fff;
  position: relative;
  z-index: 21;
}

.work-controller {
  padding: 25vh 0 20vh 0;
  position: relative;
}
</style>

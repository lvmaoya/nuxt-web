<template>
  <div class="content">
    <div class="inner">
      <div class="controller">
        <Search @search-btn-click="handleSearchBtnClick">
          <WorkTagCategory @category-tag-click="categoryTagClick" @date-range-click="dateRangeClick"
            :article-list="articleList"></WorkTagCategory>
        </Search>
      </div>
      <WorkContent v-if="total > 0" :list="articleList"></WorkContent>
      <NoData v-else></NoData>
    </div>
    <Pagination :current-page="currentPage" :total="total" :size="size"></Pagination>
  </div>
</template>

<script lang="ts" setup>
// 分页
let currentPage = ref(1);
let total = ref(0);
let size = ref(9999);

// 文章列表数据
let articleList = ref<Array<BlogType>>([]);
let cacheList = ref<Array<BlogType>>([]);
let res = (await getBlogList({ current: currentPage.value, size: size.value, category: 2 })).data;

articleList.value = res.records;
cacheList.value = [...res.records];
total.value = res.total;

// 点击分类标签
const categoryTagClick = async (val: number) => {
  if (val == -1) {
    articleList.value = cacheList.value;
  } else {
    articleList.value = cacheList.value?.filter((item: BlogType) => item.categoryId == val);
  }
};
const dateRangeClick = async (val: any) => {
  if (val == -1) {
    articleList.value = [...cacheList.value];
  } else {
    articleList.value = cacheList.value?.filter((item: BlogType) => {
      return new Date(item.publishedTime).getTime() >= val.start && new Date(item.publishedTime).getTime() <= val.end;
    });
  }

};
// 点击搜索按钮
const handleSearchBtnClick = async (searchData: any) => {
  currentPage.value = 1;
  searchData = { keywords: searchData, currentPage: currentPage.value, size: size.value };

  const resArticlesData = await getBlogList(searchData);
  articleList.value = resArticlesData.data.records;
  total.value = resArticlesData.data.total;
};

</script>

<style scoped lang="scss">
.content {
  margin-bottom: 258px;
  background-color: #fff;
  position: relative;
  z-index: 21;
}

.controller {
  padding: 25vh 0 9vh 0;
  position: relative;
}

.categoryViewWorkContent {
  position: absolute;
  transition: opacity 0.5s;
  width: 100%;
}
</style>

<template>
  <div class="content">
    <div class="inner">
      <div class="controller">
        <Search @search-btn-click="handleSearchBtnClick">
          <WorkTagCategory @category-tag-click="categoryTagClick" @date-range-click="dateRangeClick"></WorkTagCategory>
        </Search>
      </div>
      <WorkContent v-if="total > 0" :list="(articleList as ArticleListResType)?.list"></WorkContent>
      <NoData v-else></NoData>
    </div>
    <Pagination :current-page="currentPage" :total="total" :size="size"></Pagination>
  </div>
</template>

<script lang="ts" setup>
import { ArticleListResType, CategoryItemType, searchConfigType } from "~~/composables";
// 分页
let currentPage = ref(1);
let total = ref(0);
let size = ref(9999);


// 页面类别
let fatherPageCategory = "tech_article";
// 文章类别列表
let categoryList = ref<Array<CategoryItemType>>([]);
categoryList.value = (await getArticleCategoryList({ category: fatherPageCategory })).data.categoryList;

// 文章列表数据
let articleList = ref<ArticleListResType>();
articleList.value = (await getArticleList({ currentPage: currentPage.value, size: size.value })).data;
articleList.value.list = articleList.value.list.map((item) => {
  return {
    ...item,
    category_name: categoryList.value.find((category) => item.category_id === category.category_id)?.category_name ?? '',
  };
});
total.value = articleList.value.total;

// 点击分类标签
const clickCategoryId = ref();
const categoryTagClick = async (val: number) => {  
  clickCategoryId.value = val;
  if (val == -1) {
    articleList.value = (await getArticleList({ currentPage: currentPage.value, size: size.value })).data;
    total.value = articleList.value.total;
    return;
  }
  const articleByCategoryData = await getArticleByCategoryData({
    category_id: clickCategoryId.value,
    currentPage: currentPage.value,
    size: size.value,
  });
  articleList.value = articleByCategoryData.data;
  total.value = articleByCategoryData.data.total;
};
const dateRangeClick = async (val: any) => {
  // const articleByDateRangeData = await getArticleByDateRangeData({
  //   start: val.start,
  //   end: val.end
  // });
  // articleList.value = articleByDateRangeData.data;
  // total.value = articleByDateRangeData.data.total;
};
// 点击搜索按钮
const userInput = ref<searchConfigType>();
const handleSearchBtnClick = async (searchData: searchConfigType) => {
  currentPage.value = 1;
  searchData = { ...searchData, currentPage: currentPage.value, size: size.value };
  userInput.value = searchData;

  const resArticlesData = await searchArticle(searchData);
  articleList.value = resArticlesData.data;
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

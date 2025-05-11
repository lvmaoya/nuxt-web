<template>
  <div class="detailArticle">
    <div class="inner">
      <div class="content">
        <div class="title">{{ articleDetail?.title }}</div>
        <div class="date">Published on {{ formatDate(articleDetail?.publishedTime) }}, with {{ articleDetail?.pageView
          + ' view(s)' }} and {{
            commentNum + ' comment(s)' }}
        </div>
        <div class="abstract">
          <span>Ai Abstract：</span>{{ articleDetail?.articleAbstract }}
        </div>
        <article>
          <div v-html="articleDetail?.content"></div>

        </article>
        <div v-html="hm"></div>
      </div>
    </div>
    <div class="comment">
      <LazyDetailComment :articleId="articleId" @commentNum="getCommentNum"></LazyDetailComment>
    </div>
    <!-- <ScrollTop></ScrollTop> -->
  </div>
</template>

<script setup lang="ts">
import { type BlogType } from "~~/composables";
import { formatDate } from "~~/utils/formatTime";
import LocalCache from "~~/utils/cache";
import Prism from 'prismjs'

const route = useRoute();
const articleId = Number(route.params.id);
let commentNum = ref(0)
const hm = `<pre><code class="javascript">console.log('Hello');</code></pre>`
// 请求详情页数据  文本内容和数据详情
const articleDetail = ref<BlogType>();
  // const articleDetailRes = await getArticleDetail(articleId);
  // articleDetail.value = articleDetailRes.data
// Prism.highlightAll()
useHead({
  title: articleDetail.value?.title,
  meta: [
    { name: "description", content: articleDetail.value?.description },
    {
      name: "keywords",
      content: articleDetail.value?.keywords,
    },
  ],
});

const getCommentNum = (value: number) => {
  commentNum.value = value
}

const view = async () => {
  const viewedList = LocalCache.getCache('pv') || {}
  const currentTime = new Date().getTime()
  const sixHours = 6 * 60 * 60 * 1000 // 6小时的毫秒数

  // 检查是否需要更新浏览量
  const shouldUpdate = !viewedList[articleId] ||
    (currentTime - viewedList[articleId]) > sixHours

  if (shouldUpdate) {
    // 更新访问时间戳
    viewedList[articleId] = currentTime
    LocalCache.setCache('pv', viewedList)
    changePVData(articleId)
  }
}
const initArticle = async () => {
  const articleDetailRes = await getArticleDetail(articleId);
  articleDetail.value = articleDetailRes.data
}
initArticle()
onMounted(async () => {
  await nextTick()
    //  然后执行高亮即可
    Prism.highlightAll()
  view()
})
</script>

<style scoped lang="scss">
@media (max-width: 1096px) {
  .navContent {
    display: none !important;
  }
}

.detailArticle {
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 21;

  :deep(header) {
    top: 0 !important;
  }


  .content {
    margin: 0 auto;
    max-width: 960px;
    color: #313131;
    min-height: 100vh;

    .title {
      font-size: 21px;
      font-weight: 500;
      margin-top: 230px;
      margin-bottom: 40px;
    }

    .date {
      font-size: 14px;
      color: #666;
      margin-bottom: 40px;
    }


    .abstract {
      font-size: 14px;
      margin-bottom: 40px;
      color: #666;
    }
  }
}

.comment {
  position: relative;
  z-index: 21;
  color: #5f5f5f;
  background-color: #fafafa;
  padding: 30px 12px 0 12px;

}
</style>

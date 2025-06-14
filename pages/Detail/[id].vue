<template>
  <div class="detail-content">
    <div class="inner">
      <div class="content">
        <div class="title">{{ articleDetail?.title }}</div>
        <div class="date">Published on {{ formatDate(articleDetail?.publishedTime) }}, with {{ articleDetail?.pageView
          + ' view(s)' }} and {{
            commentNum + ' comment(s)' }}
        </div>
        <div class="abstract" v-if="articleDetail?.articleAbstract">
          <span>Ai 摘要：</span>{{ articleDetail?.articleAbstract }}
        </div>
        <article class="markdown-body" data-theme="light">
          <div v-html="articleDetail?.content"></div>
        </article>
      </div>
    </div>
    <div class="comment">
      <LazyDetailComment :articleId="articleId" @commentNum="getCommentNum"></LazyDetailComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type BlogType } from "~~/composables";
import { formatDate } from "~~/utils/formatTime";
import LocalCache from "~~/utils/cache";
import Prism from 'prismjs'
import "@/assets/css/md.css";

const { $activeMenu, $setActiveMenu } = useNuxtApp()

const route = useRoute();
const articleId = Number(route.params.id);
let commentNum = ref(0)
// 请求详情页数据  文本内容和数据详情
const articleDetail = ref<BlogType>();

const getCommentNum = (value: number) => {
  commentNum.value = value
}
const processCodeBlocks = async () => {
  if (!document) {
    return;
  }
  const preTags = document?.querySelectorAll('pre');
  preTags?.forEach((pre: HTMLElement) => {
    const classValue = pre.getAttribute('class');
    if (classValue) {
      const classArr = classValue.split(';')[0].split(':');
      const languageClass = `language-${classArr[1]}`;
      // 创建新的 code 元素
      const code = document.createElement('code');
      code.className = languageClass;
      code.innerHTML = pre.innerHTML;

      // 清空 pre 标签并添加新的 code 元素
      pre.innerHTML = '';
      pre.appendChild(code);
      // 添加行号支持
      // pre.className = `line-numbers ${languageClass}`;
    }
  });
  // 重新应用 Prism 高亮
  Prism.highlightAll();
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
    if (articleId) {
      changePVData(articleId)      
    }
  }
}
const initArticle = async () => {
  const articleDetailRes = await getArticleDetail(articleId);
  articleDetail.value = articleDetailRes.data
  view()
  useHead({
    title: articleDetail.value?.title,
    meta: [
      { name: "description", content: articleDetail.value?.description ?? useRuntimeConfig().public.description },
      {
        name: "keywords",
        content: articleDetail.value?.keywords ?? useRuntimeConfig().public.keywords,
      },
    ],
  });

  await nextTick()

  $setActiveMenu(articleDetail.value.fatherCategoryId ?? 0)

  processCodeBlocks()

}

initArticle()

onBeforeRouteLeave(async () => {
  $setActiveMenu(0)
})
onActivated(async () => {
  if (articleDetail.value) {
    $setActiveMenu(articleDetail.value.fatherCategoryId ?? 0)
  }
})
</script>

<style scoped lang="scss">
@media (max-width: 1096px) {
  .navContent {
    display: none !important;
  }
}

.detail-content {
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 21;
  line-height: 2;

  :deep(header) {
    top: 0 !important;
  }


  .content {
    margin: 0 auto;
    max-width: 960px;
    color: var(--primary-text-color);
    min-height: 100vh;

    .title {
      font-size: 1.5rem;
      font-weight: 500;
      margin-top: 230px;
      margin-bottom: 40px;
    }

    .date {
      font-size: var(--text-font-size);
      color: var(--secondary-text-color);
      margin-bottom: 40px;
    }


    .abstract {
      font-size: var(--text-font-size);
      margin-bottom: 40px;
      color: var(--secondary-text-color);
    }
  }
}

.comment {
  position: relative;
  z-index: 21;
  color: #5f5f5f;
  background-color: #fafafa;
  padding: 30px 12px 0 12px;
  margin-top: 40px;
}

:deep(pre) {
  font-size: 12px;
  border-radius: 8px;
  background-color: #2d2d2d;
  word-break: break-all;
  white-space: pre-wrap;
  margin: 0px !important;
  padding: 8px 12px;
  line-height: 1.42857143;
}

:deep(pre.language-css) {
  word-break: break-all;
  white-space: pre-wrap;
  margin: 0px !important;
  padding: 8px 12px;
  line-height: 1.42857143;
  color: var(--secondary-text-color);
}

:deep(.toolbar) {
  right: 12px !important;
  top: 8px !important;
  line-height: 13px;
  user-select: none;

  .toolbar-item {
    font-size: 12px;

    &:last-child {
      margin-left: 8px;
    }

    span,
    button {
      border-radius: 4px !important;
    }
  }
}
</style>

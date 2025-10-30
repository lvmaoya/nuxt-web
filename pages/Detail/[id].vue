<template>
  <div class="detail-content" :class="{ loading: loading }">
    <div class="inner detail-inner">
      <div class="content">
        <template v-if="articleDetail?.id">
          <div class="title">{{ articleDetail?.title }}</div>
          <div class="date">
            Published on {{ formatDate(articleDetail?.publishedTime) }}, with
            {{ articleDetail?.pageView + " view(s)" }} and
            {{ commentNum + " comment(s)" }}
          </div>
          <div
            class="abstract"
            v-if="
              articleDetail?.articleAbstract &&
              articleDetail?.fatherCategoryId != 4
            "
          >
            <span>Ai 摘要：</span>{{ articleDetail?.articleAbstract }}
          </div>
          <article
            class="markdown-body"
            data-theme="light"
            :class="{ 'img-article': articleDetail?.fatherCategoryId == 4 }"
          >
            <div v-html="articleDetail?.content"></div>
          </article>
        </template>
        <template v-else>
          <div class="empty">
            <div class="loading" v-if="loading">Loading...</div>
            <div v-else>Nothing shared</div>
          </div>
        </template>
      </div>
      <div
        class="navigation"
        v-if="
          articleDetail?.fatherCategoryId != 4 &&
          articleDetail?.fatherCategoryId != 3
        "
      >
        <ul>
          <li
            v-for="anchor in v_titles"
            :key="anchor.id"
            :class="{
              level1: anchor.indent == 0,
              level2: anchor.indent == 1,
              level3: anchor.indent == 2,
            }"
            @click="handleAnchorClick(anchor)"
          >
            <a style="cursor: pointer">{{ anchor.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="inner comment-inner">
      <LazyDetailComment
        :articleId="articleId"
        @commentNum="getCommentNum"
      ></LazyDetailComment>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type BlogType } from "~~/composables";
import { formatDate } from "~~/utils/formatTime";
import LocalCache from "~~/utils/cache";
import Prism from "prismjs";
import "@/assets/css/md.css";
import baseURL from "~/http/base-config";

const { $activeMenu, $setActiveMenu } = useNuxtApp();

const route = useRoute();
const articleId = Number(route.params.id);

let commentNum = ref(0);
const v_titles = ref();
const loading = ref(true);
// 请求详情页数据  文本内容和数据详情
const articleDetail = ref<BlogType>();

// 获取评论数量
const getCommentNum = (value: number) => {
  commentNum.value = value;
};
// 浏览量
const view = async () => {
  const viewedList = LocalCache.getCache("pv") || {};
  const currentTime = new Date().getTime();
  const sixHours = 6 * 60 * 60 * 1000; // 6小时的毫秒数

  // 检查是否需要更新浏览量
  const shouldUpdate =
    !viewedList[articleId] || currentTime - viewedList[articleId] > sixHours;

  if (shouldUpdate) {
    // 更新访问时间戳
    viewedList[articleId] = currentTime;
    LocalCache.setCache("pv", viewedList);
    if (articleId) {
      changePVData(articleId);
    }
  }
};
if (process.env.NODE_ENV === "production" && process.client) {
  view();
}

// 使用 useAsyncData 在服务端获取数据
const { data: articleDetailRes } = await useAsyncData(
  `detail-${articleId}`,
  () =>
    $fetch<ResponseConfig<BlogType>>(baseURL + `/h5/blog/${articleId}`, {
      method: "GET",
    })
);

// 设置文章详情数据
articleDetail.value = articleDetailRes.value?.data;
if (!articleDetail.value) {
  navigateTo("/not-found");
}
// 使用 useSeoMeta 在服务端设置 meta 标签
useSeoMeta({
  title: articleDetail.value?.title || "Lvmaoya",
  description:
    articleDetail.value?.description || useRuntimeConfig().public.description,
  keywords: articleDetail.value?.keywords || useRuntimeConfig().public.keywords,
});

// 客户端 DOM 操作
onMounted(async () => {
  if (articleDetail.value) {
    await nextTick();

    $setActiveMenu(articleDetail.value.fatherCategoryId ?? 0);

    // Prism 代码高亮需要在客户端执行
    if (process.client) {
      Prism.highlightAll();
    }

    if (
      articleDetail.value?.fatherCategoryId != 4 &&
      articleDetail.value?.fatherCategoryId != 3
    ) {
      buildAnchorTitles();
    }
    loading.value = false;
  }
});

onBeforeRouteLeave(async () => {
  $setActiveMenu(0);
});
onActivated(async () => {
  if (articleDetail.value) {
    $setActiveMenu(articleDetail.value.fatherCategoryId ?? 0);
  }
});
const buildAnchorTitles = () => {
  const preview = document.querySelector(".markdown-body");
  const anchors = preview?.querySelectorAll("h1,h2,h3,h4,h5,h6");
  if (!anchors) return;

  const titles = Array.from(anchors).filter((el) => !!el.textContent?.trim());
  const hTags = Array.from(new Set(titles.map((el) => el.tagName))).sort();

  v_titles.value = titles.map((el) => ({
    title: el.textContent,
    id: el.id || el.textContent?.replace(/\s+/g, "-").toLowerCase(),
    indent: hTags.indexOf(el.tagName),
  }));

  // 自动添加 ID 供跳转用
  titles.forEach((el) => {
    if (!el.id) {
      el.id = el.textContent?.replace(/\s+/g, "-").toLowerCase() || "";
    }
  });
};
const handleAnchorClick = (anchor: any) => {
  const target = document.getElementById(anchor.id);
  if (target) {
    const offsetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: offsetTop - 75, // 假设 header 高度为 60px
      behavior: "smooth",
    });
  }
};
</script>

<style scoped lang="scss">
.detail-content.loading {
  opacity: 0;
}

.empty {
  padding-top: 45vh;
  color: #999;
}
@media (max-width: 1330px) {
  .navigation {
    display: none !important;
  }
}

.detail-content {
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 21;
  line-height: 2;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  border-bottom: 1px solid var(--primary-border-color);
  margin-bottom: 258px;

  :deep(header) {
    top: 0 !important;
  }

  .detail-inner {
    display: flex;
    gap: 96px;
    justify-content: center;
    margin-bottom: 100px !important;
    .content {
      max-width: 960px;
      margin-left: 96px;
      color: var(--primary-text-color);
      min-height: 100vh;

      @media (max-width: 1330px) {
        & {
          margin-left: 0;
        }
      }

      @media (max-width: 960px) {
        & {
          max-width: 100%;
        }
      }

      .title {
        font-size: 2rem;
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
}

:deep(pre) {
  font-size: 12px;
  border-radius: 16px;
  // background-color: #f9f9f9;
  word-break: break-all;
  white-space: pre-wrap;
  margin: 0px !important;
  line-height: 1.42857143;
  padding: 1rem !important;
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
  top: 9.144px !important;
  line-height: 13px;
  user-select: none;

  .toolbar-item {
    &:last-child {
      margin-left: 8px;
    }

    span,
    button {
      border-radius: 4px !important;
      font-size: 12px !important;
      background-color: transparent !important;
      box-shadow: none !important;
    }

    span {
      display: block;
      padding: 0 8px !important;
      height: 20px;

      &:hover {
        color: #333 !important;
        cursor: pointer;
      }
    }
  }
}

.navigation {
  margin-top: 330px;

  ul {
    list-style: none;
    max-width: 240px;
    font-size: 14px;
    max-height: calc(100vh - 660px);
    position: sticky;
    top: 220px;
    overflow-y: auto;
    padding-right: 20px;
    overscroll-behavior: contain;
    -ms-scroll-chaining: contain;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(207, 207, 207, 0.3);
    }

    li {
      cursor: pointer;

      &.level1 {
        padding-left: 4px;
        margin-top: 16px;

        a {
          color: #333;
        }
      }

      &.level2 {
        padding-left: 16px;
        margin-top: 8px;

        a {
          color: #666;
        }
      }

      &.level3 {
        padding-left: 28px;

        a {
          color: #999;
        }
      }

      a {
        width: 100%;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:hover {
          color: #000 !important;
        }
      }

      &:first-child {
        margin-top: 8px;
      }
    }
  }
}
</style>
<style>
.code-toolbar {
  margin: 8px 0;
}

.img-article {
  margin-top: 180px;
}

.img-article img {
  border-radius: 6px;
  width: 100% !important;
  height: auto !important;
}

.img-article p {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  row-gap: 32px;
  align-items: center;
  justify-content: center;
  text-align: center;
}

@media (max-width: 768px) {
  .img-article p {
    grid-template-columns: 1fr;
  }
}
</style>

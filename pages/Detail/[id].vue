<template>
  <div class="detail-content">
    <div class="inner detail-inner">
      <div class="content">
        <div class="title">{{ articleDetail?.title }}</div>
        <div class="date">
          Published on {{ formatDate(articleDetail?.publishedTime) }}, with
          {{ articleDetail?.pageView + " view(s)" }} and
          {{ commentNum + " comment(s)" }}
        </div>
        <div class="abstract" v-if="articleDetail?.articleAbstract">
          <span>Ai 摘要：</span>{{ articleDetail?.articleAbstract }}
        </div>
        <article class="markdown-body" data-theme="light">
          <div v-html="articleDetail?.content"></div>
        </article>
      </div>
      <div class="navigation">
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
    <div class="comment">
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

const { $activeMenu, $setActiveMenu } = useNuxtApp();

const route = useRoute();
const articleId = Number(route.params.id);
let commentNum = ref(0);
const v_titles = ref();
// 请求详情页数据  文本内容和数据详情
const articleDetail = ref<BlogType>();

const getCommentNum = (value: number) => {
  commentNum.value = value;
};
const processCodeBlocks = async () => {
  if (!document) {
    return;
  }
  const preTags = document?.querySelectorAll("pre");
  preTags?.forEach((pre: HTMLElement) => {
    const classValue = pre.getAttribute("class");
    if (classValue) {
      const classArr = classValue.split(";")[0].split(":");
      const languageClass = `language-${classArr[1]}`;
      // 创建新的 code 元素
      const code = document.createElement("code");
      code.className = languageClass;
      code.innerHTML = pre.innerHTML;

      // 清空 pre 标签并添加新的 code 元素
      pre.innerHTML = "";
      pre.appendChild(code);
      // 添加行号支持
      // pre.className = `line-numbers ${languageClass}`;
    }
  });
  // 重新应用 Prism 高亮
  Prism.highlightAll();
};
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
const initArticle = async () => {
  const articleDetailRes = await getArticleDetail(articleId);
  articleDetail.value = articleDetailRes.data;
  view();
  useHead({
    title: articleDetail.value?.title,
    meta: [
      {
        name: "description",
        content:
          articleDetail.value?.description ??
          useRuntimeConfig().public.description,
      },
      {
        name: "keywords",
        content:
          articleDetail.value?.keywords ?? useRuntimeConfig().public.keywords,
      },
    ],
  });

  await nextTick();

  $setActiveMenu(articleDetail.value.fatherCategoryId ?? 0);

  processCodeBlocks();

  buildAnchorTitles();
};

initArticle();

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

  :deep(header) {
    top: 0 !important;
  }

  .detail-inner {
    display: flex;
    gap: 96px;
    justify-content: center;
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
      &:focus {
        color: white !important;
      }
    }
    span {
      display: block;
      padding: 0 8px !important;
      height: 20px;
      &:hover {
        color: white !important;
        cursor: pointer;
      }
      &:focus {
        color: white !important;
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

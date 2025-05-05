<template>
  <div class="detailArticle">
    <div class="inner">
      <div class="content">
        <div class="desc">
          <div class="title">{{ articleDetail?.title }}</div>
          <div class="date">Published on {{ formatDate(articleDetail?.publishedTime) }}, with {{ articleDetail?.pageView  + ' view(s)'}} and {{
              commentNum + ' comment(s)' }}
          </div>
        </div>
        <article>
          <ClientOnly>
            <div v-html="articleDetail?.content"></div>
          </ClientOnly>
        </article>
        <!-- <LazyDetailFooterBar :articleId="articleId"></LazyDetailFooterBar> -->
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
const route = useRoute();
const articleId = Number(route.params.id);
// 请求浏览量和点赞数据
let commentNum = ref(0)

// 请求详情页数据  文本内容和数据详情
const articleDetail = ref<BlogType>();
const articleDetailRes = await getArticleDetail(articleId);
articleDetail.value = articleDetailRes.data

useHead({
  title: articleDetail.value.title,
  meta: [
    { name: "description", content: articleDetail.value.description },
    {
      name: "keywords",
      content: articleDetail.value.keywords,
    },
  ],
});
const getCommentNum = (value: number) => {
  commentNum.value = value
}
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

  .navContent {
    position: relative;
    z-index: 0;
    max-width: 960px;
    margin-right: auto !important;
    margin-left: auto !important;
    text-align: right;

    .navigation {
      position: fixed;
      display: inline-block;
      top: 200px;
      z-index: 0;
      font-size: 13.5px;
      text-align: left;
      background: #fff;
      height: 50vh;
      padding-left: 24px;
      overflow-y: scroll;
      display: none;
      &>ul {
        position: relative;
        border-left: 1px solid #f1f1f1;

        li {
          list-style: none;
          line-height: 2.2;

          a {
            white-space: nowrap;
          }

          &:hover {
            a {
              color: #eb5055
            }
          }
        }

        .level1 {
          padding-left: 6px;

          a {
            color: #313131;
          }

          &::before {
            position: relative;
            top: 0;
            left: -10px;
            display: inline-block;
            width: 7px;
            height: 7px;
            content: '';
            border-radius: 50%;
            background-color: #eb5055;
          }
        }

        .level2 {
          padding-left: 20px;
          color: #999;
          line-height: 1.8;
        }
      }
    }
  }


  .content {
    margin: 0 auto;
    max-width: 960px;
    color: #313131;
    min-height: 100vh;

    .desc {
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 66px;

      .title {
        font-size: 21px;
        font-weight: 500;
        line-height: 4em;
      }

      .date {
        font-size: 14px;
        // font-style: italic;
      }
    }

    :deep(.github-markdown-body) {
      padding: 0;
      font-size: 14px;
      line-height: 1.8;
      font-family: 'Josefin Sans', -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", STHeiti, "Microsoft Yahei", "WenQuanYi Micro Hei", Arial, Verdana, sans-serif;

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: 500;
        position: relative;
        margin: 20px 0;

        &::before {
          font-weight: 600;
          position: absolute;
          top: 0;
          left: -15px;
          content: '#';
          color: #eb5055;
        }
      }

    }
  }
}

.comment {
  position: relative;
  z-index: 21;
  color: #5f5f5f;
  background-color: #f7f7f7;
  padding: 30px 12px 0 12px;

}
</style>

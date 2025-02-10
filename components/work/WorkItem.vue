<template>
  <a class="workActicleItem" :href="'/detail/' + props.item.article_id">
    <div class="articleContent">
      <div class="category">
        {{ item.category_name }}
      </div>
      <div class="title">
        {{ props.item.title }}
      </div>
      <div class="description">
        <p>
          {{ props.item.description }}
        </p>
      </div>
      <div class="data">
        <div class="about">
          <span>{{ convertDateToAbbreviatedMonthYear(props.item.published_time) }} • {{ props.item.pageview }}
            view(s)</span>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { type ArticleItemResType } from "~~/composables";
const props = defineProps<{
  item: ArticleItemResType;
  index: number
}>();

const convertDateToAbbreviatedMonthYear = (dateStr: string) => {
  const date = new Date(dateStr);
  const monthAbbreviations = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthAbbreviation = monthAbbreviations[monthIndex];
  const day = date.getDate();
  return `${day} ${monthAbbreviation}, ${year}`;
}

</script>

<style scoped lang="scss">
.workActicleItem {
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 20px;
  display: flex;
  overflow: hidden;
  // min-height: 140px;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 12px auto;

  &:hover {
    .title:before {
      width: 100% !important;
    }
  }

  .articleContent {
    width: 100%;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .category {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
    }

    .title {
      // font-size: 1.1em;
      font-weight: 600;
      // padding: 10px 10px 0px 0;
      color: #333;
      position: relative;
      border: 1px solid transparent;
      width: fit-content;

      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0px;
        height: 1px;
        background: #4d4d4d;
        transform: translateX(-50%);
        transition: width 0.3s ease;
      }

      &::first-letter {
        text-transform: uppercase;
      }
    }

    .description {
      p {
        font-size: 0.875em;
        font-weight: 400;
        color: #333;
        overflow: hidden;
        white-space: normal;
        word-break: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    .data {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 12px;
        color: gray;
      }

      .about {
        span {
          margin-right: 3px;
          color: gray;

        }
      }
    }
  }
}
</style>

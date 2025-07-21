<template>
  <a class="work-content-item" :href="'/detail/' + props.item.id">
    <div class="content">
      <div class="category">
        {{ item.category?.categoryName }}
      </div>
      <div class="title">
        {{ props.item.title }}
      </div>
      <div class="description">
        <p>
          {{ props.item.description.length? props.item.description : props.item.articleAbstract }} 
        </p>
      </div>
      <div class="data">
        <div class="about">
          <span>{{ convertDateToAbbreviatedMonthYear(props.item.publishedTime) }} • {{ props.item.pageView }}
            view(s)</span>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { type BlogType } from "~~/composables";
const props = defineProps<{
  item: BlogType;
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
.work-content-item {
  border-radius: 12px;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 20px;
  display: flex;
  overflow: hidden;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 32px auto;

  &:hover {
    .title:before {
      width: 100% !important;
    }
  }

  .content {
    width: 100%;
    padding: 12px 0px;
    display: flex;
    flex-direction: column;
    gap: 14px;

    .category {
      font-size: var(--text-small-font-size);
      color: var(--third-text-color);
      text-transform: uppercase;
    }

    .title {
      position: relative;
      border: 1px solid transparent;
      width: fit-content;
      color: var(--primary-title-color);
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
        font-size: var(--sub-title-font-size);
        font-weight: 400;
        color: var(--primary-title-color);
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
        font-size: var(--text-small-font-size);
        color: var(--third-text-color);
      }

      .about {
        span {
          margin-right: 4px;
          color: var(--third-text-color);
        }
      }
    }
  }
}
</style>

<!--
 * @Author: sun
 * @Date: 2022-12-28 08:45:41
 * @LastEditTime: 2023-02-17 14:53:19
 * @Description: Do not edit
-->
<template>
  <ul>
    <li v-for="item in props.blogList" :key="item.id">
      <a :href="'/detail/' + item.id">
        <div class="article-image">
          <img :src="item.coverImage" alt />
        </div>
        <div class="article-content">
          <div class="title">
            <span>{{ item.title }}</span>
          </div>
          <div class="date">
            <span>{{ item.publishedTime.replace(/:[^:]*$/, '') }}</span>
          </div>
          <div class="description">{{ item.description }}</div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  blogList: {
    required: true,
    type: Array<BlogType>,
  },
});
</script>

<style scoped lang="scss">
ul {
  width: 100%;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: repeat(4, 1fr);

  li {
    width: 100%;
    list-style: none;
    &:hover {
      .title span {
        border-bottom: 1px solid #4d4d4d;
      }
    }
    a {
      display: block;
    }

    .article-image {
      width: 100%;
      height: auto;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        vertical-align: bottom;
      }
    }

    .article-content {
      padding-top: 2em;
    }

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-bottom: 0.1em;
      margin: 0 0 1em;
      box-sizing: border-box;

      span {
        cursor: pointer;
        border-bottom: 1px solid #ffffff;
        transition: all 0.2s;
        color: var(--primary-text-color);
        display: block;
        width: fit-content;
      }
    }

    .date {
      padding: 0 0 1em;

      span {
        display: block;
        font-style: italic;
        font-size: var(--text-small-font-size);
        color: var(--third-text-color);
      }
    }

    .description {
      font-size: var(--text-font-size);
      line-height: 1.75;
      padding: 0 0 2em;
      color: var(--secondary-text-color);
      overflow: hidden;
      white-space: normal;
      letter-spacing: var(--primary-letter-spacing);
      word-break: break-word;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }
}

@media (min-width: 768px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  ul {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1400px) {
  ul {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>

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
        <div class="img">
          <img :src="item.coverImage" alt="" />
        </div>
        <div class="articleDetail">
          <div class="title">
            <span class="titleContent">{{ item.title }}</span>
          </div>
          <div class="date">
            <span> {{ item.publishedTime.replace(/:[^:]*$/, '') }}</span>
          </div>
          <div class="description">
            {{ item.description }}
          </div>
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
  padding-bottom: 50px;
  display: flex;
  min-height: 50vh;
  flex-wrap: wrap;

  li {
    width: 100%;
    list-style: none;
    &:hover {
      .title .titleContent {
        border-bottom: 1px solid #4d4d4d;
      }
    }
    a {
      display: block;
    }

    .img {
      width: 100%;
      height: auto;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
        vertical-align: bottom;
      }
    }

    .articleDetail {
      padding-top: 2em;
      // padding-right: 15px;
    }

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-bottom: 0.1em;
      margin: 0 0 1em;
      // cursor: pointer;
      box-sizing: border-box;

      .titleContent {
        cursor: pointer;
        border-bottom: 1px solid #ffffff;
        transition: all 0.2s;
        color: black;
        font-weight: 400;
        display: block;
        width: fit-content;
      }
    }

    .date {
      padding: 0 0 1.4em;

      span {
        display: block;
        font-style: italic;
        font-size: 0.875em;
        font-weight: 400;
        color: #555666;
      }
    }

    .description {
      font-size: 0.875em;
      line-height: 1.7;
      font-weight: 400;
      padding: 0 0 1.4em;
      color: #555666;
      overflow: hidden;
      white-space: normal;
      letter-spacing: 0.06em;
      word-break: break-word;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }
}

@media (min-width: 768px) {
  ul li {
    width: calc(50% - 15px);
    margin: 0 30px 20px 0;
    list-style: none;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}

@media (min-width: 1024px) {
  ul li {
    width: calc(33.33333% - 15px);
    margin: 0 20px 20px 0;
    padding: 0;
    list-style: none;

    &:nth-child(2n) {
      margin-right: 20px;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

@media (min-width: 1400px) {
  ul li {
    width: calc(25% - 15px);
    list-style: none;

    &:nth-child(2n) {
      margin-right: 20px;
    }

    &:nth-child(3n) {
      margin-right: 20px;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>

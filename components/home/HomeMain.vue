<template>
  <div class="home-body">
    <div class="inner">
      <ul class="content">
        <li v-for="item in props.thingList" :key="item.id" ref="homeMainItemRef">
          <a :href="'/detail/' + item.id">
            <div class="image" :data-src="item.coverImage">
            </div>
            <div class="item-title">
              <h4>{{ item.title }}</h4>
            </div>
            <div class="item-description">
              <p>{{ item.description }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type BlogType } from "~~/composables";

const props = defineProps({
  thingList: {
    type: Array<BlogType>,
    required: true,
  },
});

const homeMainItemRef = ref();
onMounted(() => {
  isView(homeMainItemRef);
});
</script>

<style lang="scss" scoped>
.home-body {
  -webkit-box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 40;
  padding-top: 50px;
  margin-bottom: 255px;
  background-color: #fff;

  ul {
    width: 100%;
    display: grid;
    padding-bottom: 60px;
    column-gap: 30px;
    row-gap: 60px;
    grid-template-columns: repeat(3, 1fr);
    cursor: pointer;

    a {
      display: block;
      width: 100%;
      height: auto;
      overflow: hidden;
      background: #fff;

      .image {
        width: 100%;
        padding-bottom: 100%;
        overflow: hidden;
        background-color: #4d4d4d;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .item-title {
        margin-top: 2em;
        font-size: var(--title-font-size);

        h4 {
          color: var(--primary-title-color);
          font-weight: 400;
        }
      }

      .item-description {
        margin-top: 1em;
        font-size: var(--sub-title-font-size);

        p {
          margin: 0;
          width: 100%;
          /* 4行 × 1.5em的行高 = 6em */
          max-height: 7em;
          /* 限制最大高度为4行 */
          line-height: 1.75em;
          overflow: hidden;
          /* 隐藏超出部分 */
          display: -webkit-box;
          /* 兼容性写法 */
          display: -moz-box;
          text-overflow: ellipsis;
          letter-spacing: var(--primary-letter-spacing);
        }
      }
    }

    li {
      width: 100%;
      list-style: none;
    }

    @media (min-width: 480px) {
      & {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    @media (min-width: 768px) {
       & {
        grid-template-columns: repeat(2, 1fr);
      }
    }


    @media (min-width: 1024px) {
       & {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}
</style>

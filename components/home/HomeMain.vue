<template>
  <div class="homeMain">
    <div class="inner">
      <ul class="content" v-viewport>
        <li class="homeMainItem" v-for="item in props.thingList" :key="item.id" ref="homeMainItemRef">
          <a :href="'/detail/' + item.id">
            <div class="image" :data-src="item.coverImage">
            </div>
            <div class="itemTitle">
              <h4>{{ item.title }}</h4>
            </div>
            <div class="description">
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
.homeMain {
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
    display: flex;
    flex-wrap: wrap;
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

      .itemTitle h4 {
        color: black;
        margin-top: 24px;
        font-weight: 400;
      }

      .description {
        margin-top: 8px;

        p {
          margin: 0;
          width: 100%;
          font-size: 0.875em;
          height: 5em;
          line-height: 1.5em;
        }
      }
    }

    // &:hover .image>img {
    //   transform: scale(1.05);
    //   transition: all 0.6s ease 0s;
    // }

    // &:hover a {
    //   transition: all 1s ease 0s;
    //   box-shadow: 5px 5px 10px #f9f9f9;
    // }


    li {
      width: 100%;
      list-style: none;
      margin: 0 0 40px;
    }

    @media (min-width: 480px) {
      li {
        width: calc(50% - 10px);
        list-style: none;
        margin: 0 20px 40px 0;

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }

    @media (min-width: 768px) {
      li {
        width: calc(50% - 15px);
        margin: 0 30px 80px 0;
        list-style: none;

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }


    @media (min-width: 1024px) {
      li {
        width: calc(33.33% - 20px);
        margin: 0 30px 80px 0;
        list-style: none;

        &:nth-child(2n) {
          margin-right: 30px;
        }

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

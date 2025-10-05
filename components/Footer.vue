<template>
  <client-only>
    <footer>
      <div class="inner content">
        <div class="about item">
          <div class="item-content">
            <div class="title">LVMAOYA</div>
            <div class="copyright">
              <p>©2025 <i class="heart"></i>lvmaoya .</p>
              <slot></slot>
            </div>
            <ul class="contact">
              <li><a href="https://github.com/lvmaoya" target="_blank"></a></li>
              <li><a href="https://mail.qq.com/" target="_blank"></a></li>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
            </ul>
          </div>
        </div>
        <div class="recentPost item">
          <div class="item-content">
            <div class="title">RECENT POSTS</div>
            <ul>
              <li v-for="item in recentArticleList">
                <a :href="'/detail/' + item.id">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </client-only>
</template>

<script setup lang="ts">
import { type BlogType } from "@/composables/index";
const recentArticleList = ref<Array<BlogType>>();
recentArticleList.value = (await getBlogList({ size: 5 })).data.records;
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  font-size: var(--text-small-font-size);
  background-color: #fff;
  box-sizing: border-box;
  
  // 添加淡入动画
  animation: fadeIn 0.5s ease-in-out;
  
  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 50px 0;
    height: 250px;
    gap: 30px;
    @media (max-width: 1024px) {
      & {
        grid-template-columns: repeat(2, 1fr);
        padding-left: 30px;
        padding-right: 30px;
      }
    }

    @media (max-width: 768px) {
      & {
        grid-template-columns: repeat(1, 1fr);
        padding-left: 30px;
        padding-right: 30px;
      }
    }
    .item-content {
      height: 100%;
      width: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .title {
      font-size: var(--text-font-size);
      padding: 0;
      text-decoration: none;
    }

    .about {
      .copyright {
        color: var(--third-text-color);

        p {
          padding: 0 0 20px 0;

          a {
            color: var(--third-text-color);
          }

          &:first-child {
            display: flex;
            align-items: center;
          }

          .heart {
            width: 8px;
            height: 8px;
            background-color: red;
            position: relative;
            display: block;
            margin: 0px 6px;
            animation: size 0.8s infinite;
            animation-direction: alternate;
          }

          .heart::before,
          .heart::after {
            content: "";
            width: 8px;
            height: 8px;
            background-color: red;
            position: absolute;
            border-radius: 50%;
          }

          .heart::before {
            left: -4px;
          }

          .heart::after {
            top: -4px;
          }

          @keyframes size {
            0% {
              transform: scale(0.95) rotate(45deg);
            }

            100% {
              transform: scale(1) rotate(45deg);
            }
          }
        }
      }

      .contact {
        display: flex;

        li {
          margin: 0 20px 0 0;
          list-style: none;

          a {
            background-repeat: no-repeat;
            background-size: cover;
            display: block;
            opacity: 0.8;
            text-indent: -9999px;
            transition: opacity 0.2s linear;
            width: 25px;
            height: 25px;

            &:hover {
              opacity: 1;
            }
          }

          &:nth-child(1) a {
            background-image: url(../assets/img/github.svg);
          }

          &:nth-child(2) a {
            background-image: url(../assets/img/email.svg);
          }

          &:nth-child(3) a {
            background-image: url(../assets/img/weibo.svg);
          }

          &:nth-child(4) a {
            background-image: url(../assets/img/weixin.svg);
          }

          &:nth-child(5) a {
            background-image: url(../assets/img/zhihu.svg);
          }
        }
      }
    }

    .recentPost {
      display: flex;
      justify-content: center;
      @media (max-width: 1024px) {
        & {
          display: none !important;
        }
      }
      a:hover {
        text-decoration: underline;
        color: var(--primary-text-color);
        transition: all 0.2s linear;
      }

      ul {
        li {
          font-size: var(--text-small-font-size);
          line-height: 25px;
          list-style: none;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: var(--secondary-text-color);
        }
      }
    }
  }
}

// 定义淡入动画
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

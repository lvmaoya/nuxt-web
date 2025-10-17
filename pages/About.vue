<template>
  <div class="about-content">
    <div class="inner">
      <div class="about-introduce">
        <span v-html="userInfo.introduce"></span>
      </div>
      <div class="about-contact">
        <ul>
          <li>
            <a href="https://mail.qq.com/" target="_blank"><span>Email </span></a>
          </li>
          <li class="githubLi">
            <a href="https://github.com/lvmaoya" target="_blank"><span>Github</span></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "About - lvmaoya"
});
const userInfo = (await getUserInfo()).data;
</script>

<style scoped lang="scss">
.about-content {
  border-bottom: 1px solid var(--primary-border-color);
  height: 100vh;
  padding-top: 150px;
  margin-bottom: 258px;
  background-color: #fff;
  position: relative;
  z-index: 21;
}

.inner {

  .about-introduce {
    display: flex;
    align-items: center;
    padding-bottom: 5em;

    span {
      font-size: var(--sub-title-font-size);
    }
  }

  .about-contact {
    li {
      list-style: none;
    }

    .githubLi {
      margin-top: 1em;
    }

    a {
      span {
        margin-right: 5px;
        font-size: 1.2rem;
        color: var(--secondary-text-color);
      }

      &:hover {
        text-decoration: underline;
        color: var(--secondary-text-color);
        transition: all .2s linear;
      }
    }

    padding: 0 0.5em 0 0;
  }
}
</style>

<template>
  <client-only>
    <footer>
      <div class="inner content">
        <div class="about">
          <div class="title">Lvmaoya</div>
          <div class="copyright">©2025 <i class="heart"></i> Lvmaoya</div>
          <div class="copyright">
            <a href="https://beian.miit.gov.cn/" target="_blank"
              >豫ICP备2024068051号-1</a
            >
          </div>
        </div>
        <div class="contact">
          <div><a href="https://github.com/lvmaoya" target="_blank"></a></div>
          <div><a href="https://mail.qq.com/" target="_blank"></a></div>
        </div>
      </div>
    </footer>
  </client-only>
</template>

<style lang="scss" scoped>
footer {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  font-size: var(--text-font-size);
  color: var(--third-text-color);
  background-color: #fff;
  box-sizing: border-box;
  animation: fadeIn 0.5s ease-in-out;

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 50px 0;
    height: 250px;
    gap: 30px;
    @media (max-width: 768px) {
      & {
        grid-template-columns: repeat(1, 1fr);
        padding-left: 30px;
        padding-right: 30px;
        .contact {
          justify-content: flex-start !important;
        }
      }
    }
    .about {
      height: 100%;
      width: fit-content;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 32px;
    }

    .title {
      font-size: 16px;
      padding: 0;
      text-decoration: none;
      color: var(--secondary-text-color);
    }
    .copyright {
      display: flex;
      align-items: center;
      font-size: 14px;
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
    .contact {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        margin: 0 28px 0 0;

        a {
          background-repeat: no-repeat;
          background-size: cover;
          display: block;
          opacity: 0.8;
          text-indent: -9999px;
          width: 28px;
          height: 28px;
        }

        &:nth-child(1) a {
          background-image: url(../assets/img/github.svg);
        }

        &:nth-child(2) a {
          background-image: url(../assets/img/email.svg);
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

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
        <div class="musicBox item">
          <div class="item-content">
            <div class="title">READING WITH MISIC</div>
            <div class="musicContent">
              <div class="musicTitle">{{ currentMusic.title }}</div>
              <ul class="control">
                <li @click="handlelastClick"><a href="javascript:;"></a></li>
                <li @click="handlePauseClick" :class="{ stop: isStoped }">
                  <a href="javascript:;"></a>
                </li>
                <li @click="handleNextClick"><a href=" javascript:;"></a></li>
              </ul>

              <audio
                :src="currentMusic.url"
                ref="audio"
                @timeupdate="audioTimeUpdate"
                @pause="musicPause"
                @ended="musicEnded"
                @canplay="canplay"
                @playing="musicPlaying"
                @error="musicErr"
              ></audio>
            </div>
            <div class="progress">
              <span class="line">
                <i class="currentTime"></i>
              </span>
              <span class="time"
                >{{ formatSeconds(currentTime) }} /
                {{ convertSecondsToMmSs(totalTime) }}</span
              >
            </div>
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

const audio = ref();
const currentTime = ref(0);
const totalTime = ref(0);
const musicList = [
  {
    title: "刘夏夏夏夏夏 - 装下银河的包裹",
    url: "https://qn.lvmaoya.cn/music/%E5%88%98%E5%A4%8F%E5%A4%8F%E5%A4%8F%E5%A4%8F%20-%20%E8%A3%85%E4%B8%8B%E9%93%B6%E6%B2%B3%E7%9A%84%E5%8C%85%E8%A3%B9.ogg",
    id: 0,
    duration: 170,
  },

  {
    title: "和田薫 - ふたりの気持ち (两人的心情)",
    url: "https://qn.lvmaoya.cn/music/%E5%92%8C%E7%94%B0%E8%96%AB%20-%20%E3%81%B5%E3%81%9F%E3%82%8A%E3%81%AE%E6%B0%97%E6%8C%81%E3%81%A1%20%28%E4%B8%A4%E4%BA%BA%E7%9A%84%E5%BF%83%E6%83%85%29.ogg",
    id: 1,
    duration: 159,
  },

  {
    title: "四季音色 - 夏夜",
    url: "https://qn.lvmaoya.cn/music/%E5%9B%9B%E5%AD%A3%E9%9F%B3%E8%89%B2%20-%20%E5%A4%8F%E5%A4%9C.ogg",
    id: 2,
    duration: 185,
  },

  {
    title: "市川淳 - Old Memory",
    url: "https://qn.lvmaoya.cn/music/%E5%B8%82%E5%B7%9D%E6%B7%B3%20-%20Old%20Memory.ogg",
    id: 3,
    duration: 113,
  },

  {
    title: "张雄关 - 花开 Blossom (2020 Studio Version)",
    url: "https://qn.lvmaoya.cn/music/%E5%BC%A0%E9%9B%84%E5%85%B3%20-%20%E8%8A%B1%E5%BC%80%20Blossom%20%282020%20Studio%20Version%29.ogg",
    id: 4,
    duration: 372,
  },

  {
    title: "折户伸治 - 潮鳴り (潮鸣)",
    url: "https://qn.lvmaoya.cn/music/%E6%8A%98%E6%88%B7%E4%BC%B8%E6%B2%BB%20-%20%E6%BD%AE%E9%B3%B4%E3%82%8A%20%28%E6%BD%AE%E9%B8%A3%29.ogg",
    id: 5,
    duration: 157,
  },

  {
    title: "曲舒心 - 捕捉星碎片の你",
    url: "https://qn.lvmaoya.cn/music/%E6%9B%B2%E8%88%92%E5%BF%83%20-%20%E6%8D%95%E6%8D%89%E6%98%9F%E7%A2%8E%E7%89%87%E3%81%AE%E4%BD%A0.ogg",
    id: 6,
    duration: 123,
  },

  {
    title: "末小皮 - 布达树下跳动的晨舞",
    url: "https://qn.lvmaoya.cn/music/%E6%9C%AB%E5%B0%8F%E7%9A%AE%20-%20%E5%B8%83%E8%BE%BE%E6%A0%91%E4%B8%8B%E8%B7%B3%E5%8A%A8%E7%9A%84%E6%99%A8%E8%88%9E.ogg",
    id: 7,
    duration: 224,
  },

  {
    title: "末小皮 - 慵懒的能量大沙发",
    url: "https://qn.lvmaoya.cn/music/%E6%9C%AB%E5%B0%8F%E7%9A%AE%20-%20%E6%85%B5%E6%87%92%E7%9A%84%E8%83%BD%E9%87%8F%E5%A4%A7%E6%B2%99%E5%8F%91.ogg",
    id: 8,
    duration: 272,
  },

  {
    title: "末小皮 - 我在月亮船上睡着了",
    url: "https://qn.lvmaoya.cn/music/%E6%9C%AB%E5%B0%8F%E7%9A%AE%20-%20%E6%88%91%E5%9C%A8%E6%9C%88%E4%BA%AE%E8%88%B9%E4%B8%8A%E7%9D%A1%E7%9D%80%E4%BA%86.ogg",
    id: 9,
    duration: 264,
  },

  {
    title: "末小皮 - 洞察万物不执着于心",
    url: "https://qn.lvmaoya.cn/music/%E6%9C%AB%E5%B0%8F%E7%9A%AE%20-%20%E6%B4%9E%E5%AF%9F%E4%B8%87%E7%89%A9%E4%B8%8D%E6%89%A7%E7%9D%80%E4%BA%8E%E5%BF%83.ogg",
    id: 10,
    duration: 201,
  },

  {
    title: "末小皮 - 边境小城里的一朵云",
    url: "https://qn.lvmaoya.cn/music/%E6%9C%AB%E5%B0%8F%E7%9A%AE%20-%20%E8%BE%B9%E5%A2%83%E5%B0%8F%E5%9F%8E%E9%87%8C%E7%9A%84%E4%B8%80%E6%9C%B5%E4%BA%91.ogg",
    id: 11,
    duration: 258,
  },

  {
    title: "李培 - 解脱",
    url: "https://qn.lvmaoya.cn/music/%E6%9D%8E%E5%9F%B9%20-%20%E8%A7%A3%E8%84%B1.ogg",
    id: 12,
    duration: 206,
  },

  {
    title: "松谷卓 - 最後の森へ… (最后的森林)",
    url: "https://qn.lvmaoya.cn/music/%E6%9D%BE%E8%B0%B7%E5%8D%93%20-%20%E6%9C%80%E5%BE%8C%E3%81%AE%E6%A3%AE%E3%81%B8%E2%80%A6%20%28%E6%9C%80%E5%90%8E%E7%9A%84%E6%A3%AE%E6%9E%97%29.ogg",
    id: 13,
    duration: 203,
  },

  {
    title: "林键标 - 暖雨",
    url: "https://qn.lvmaoya.cn/music/%E6%9E%97%E9%94%AE%E6%A0%87%20-%20%E6%9A%96%E9%9B%A8.ogg",
    id: 14,
    duration: 139,
  },

  {
    title: "柄智 - 夕阳西下",
    url: "https://qn.lvmaoya.cn/music/%E6%9F%84%E6%99%BA%20-%20%E5%A4%95%E9%98%B3%E8%A5%BF%E4%B8%8B.ogg",
    id: 15,
    duration: 212,
  },

  {
    title: "武言圣 - 失散的城市",
    url: "https://qn.lvmaoya.cn/music/%E6%AD%A6%E8%A8%80%E5%9C%A3%20-%20%E5%A4%B1%E6%95%A3%E7%9A%84%E5%9F%8E%E5%B8%82.ogg",
    id: 16,
    duration: 213,
  },

  {
    title: "猫仙人 - Pop & Vibe Type Beat “Feeling”",
    url: "https://qn.lvmaoya.cn/music/%E7%8C%AB%E4%BB%99%E4%BA%BA%20-%20Pop%20%26%20Vibe%20Type%20Beat%20%E2%80%9CFeeling%E2%80%9D.ogg",
    id: 17,
    duration: 160,
  },

  {
    title: "羽肿 - 花火が瞬く夜に",
    url: "https://qn.lvmaoya.cn/music/%E7%BE%BD%E8%82%BF%20-%20%E8%8A%B1%E7%81%AB%E3%81%8C%E7%9E%AC%E3%81%8F%E5%A4%9C%E3%81%AB.ogg",
    id: 18,
    duration: 271,
  },

  {
    title: "蓝莓酱 - 所爱隔山海",
    url: "https://qn.lvmaoya.cn/music/%E8%93%9D%E8%8E%93%E9%85%B1%20-%20%E6%89%80%E7%88%B1%E9%9A%94%E5%B1%B1%E6%B5%B7.ogg",
    id: 19,
    duration: 115,
  },

  {
    title: "蓝莓酱 - 星河不可及",
    url: "https://qn.lvmaoya.cn/music/%E8%93%9D%E8%8E%93%E9%85%B1%20-%20%E6%98%9F%E6%B2%B3%E4%B8%8D%E5%8F%AF%E5%8F%8A.ogg",
    id: 20,
    duration: 225,
  },

  {
    title: "贺柳（Annie Hall） - 再见九月Farewell，my september (纯音乐)",
    url: "https://qn.lvmaoya.cn/music/%E8%B4%BA%E6%9F%B3%EF%BC%88Annie%20Hall%EF%BC%89%20-%20%E5%86%8D%E8%A7%81%E4%B9%9D%E6%9C%88Farewell%EF%BC%8Cmy%20september%20%28%E7%BA%AF%E9%9F%B3%E4%B9%90%29.ogg",
    id: 21,
    duration: 361,
  },

  {
    title: "轻松音乐 - 月光下的云海 (钢琴曲版)",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%9F%B3%E4%B9%90%20-%20%E6%9C%88%E5%85%89%E4%B8%8B%E7%9A%84%E4%BA%91%E6%B5%B7%20%28%E9%92%A2%E7%90%B4%E6%9B%B2%E7%89%88%29.ogg",
    id: 22,
    duration: 107,
  },

  {
    title: "轻松频率 - 图书馆",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E5%9B%BE%E4%B9%A6%E9%A6%86.ogg",
    id: 23,
    duration: 142,
  },

  {
    title: "轻松频率 - 在路上",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E5%9C%A8%E8%B7%AF%E4%B8%8A.ogg",
    id: 24,
    duration: 233,
  },

  {
    title: "轻松频率 - 山川谷隐",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E5%B1%B1%E5%B7%9D%E8%B0%B7%E9%9A%90.ogg",
    id: 25,
    duration: 206,
  },

  {
    title: "轻松频率 - 旅程",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%97%85%E7%A8%8B.ogg",
    id: 26,
    duration: 190,
  },

  {
    title: "轻松频率 - 时光",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%97%B6%E5%85%89.ogg",
    id: 27,
    duration: 213,
  },

  {
    title: "轻松频率 - 朦胧清晨",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%9C%A6%E8%83%A7%E6%B8%85%E6%99%A8.ogg",
    id: 28,
    duration: 233,
  },

  {
    title: "轻松频率 - 沧海",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%B2%A7%E6%B5%B7.ogg",
    id: 29,
    duration: 190,
  },

  {
    title: "轻松频率 - 灯塔水母：时空守护者",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E7%81%AF%E5%A1%94%E6%B0%B4%E6%AF%8D%EF%BC%9A%E6%97%B6%E7%A9%BA%E5%AE%88%E6%8A%A4%E8%80%85.ogg",
    id: 30,
    duration: 159,
  },

  {
    title: "轻松频率 - 记忆",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E8%AE%B0%E5%BF%86.ogg",
    id: 31,
    duration: 187,
  },

  {
    title: "轻松频率 - 闪烁",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E9%97%AA%E7%83%81.ogg",
    id: 32,
    duration: 144,
  },

  {
    title: "轻松频率 - 雨后暖阳",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E9%9B%A8%E5%90%8E%E6%9A%96%E9%98%B3.ogg",
    id: 33,
    duration: 215,
  },

  {
    title: "轻松频率 - 风雪起舞",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E9%A3%8E%E9%9B%AA%E8%B5%B7%E8%88%9E.ogg",
    id: 34,
    duration: 147,
  },

  {
    title: "青睐 - 夏の景色",
    url: "https://qn.lvmaoya.cn/music/%E9%9D%92%E7%9D%90%20-%20%E5%A4%8F%E3%81%AE%E6%99%AF%E8%89%B2.ogg",
    id: 35,
    duration: 233,
  },

  {
    title: "颜轻柔 - 携温柔坠落",
    url: "https://qn.lvmaoya.cn/music/%E9%A2%9C%E8%BD%BB%E6%9F%94%20-%20%E6%90%BA%E6%B8%A9%E6%9F%94%E5%9D%A0%E8%90%BD.ogg",
    id: 36,
    duration: 141,
  },

  {
    title: "马永康YoungKha - 极光磁场Aurora",
    url: "https://qn.lvmaoya.cn/music/%E9%A9%AC%E6%B0%B8%E5%BA%B7YoungKha%20-%20%E6%9E%81%E5%85%89%E7%A3%81%E5%9C%BAAurora.ogg",
    id: 37,
    duration: 224,
  },

  {
    title: "高学深 - Transience 稍纵即逝",
    url: "https://qn.lvmaoya.cn/music/%E9%AB%98%E5%AD%A6%E6%B7%B1%20-%20Transience%20%E7%A8%8D%E7%BA%B5%E5%8D%B3%E9%80%9D.ogg",
    id: 38,
    duration: 482,
  },

  {
    title: "鹭起Herons - Lost Romance",
    url: "https://qn.lvmaoya.cn/music/%E9%B9%AD%E8%B5%B7Herons%20-%20Lost%20Romance.ogg",
    id: 39,
    duration: 164,
  },

  {
    title: "鹭起Herons - Prelude(序)",
    url: "https://qn.lvmaoya.cn/music/%E9%B9%AD%E8%B5%B7Herons%20-%20Prelude%28%E5%BA%8F%29.ogg",
    id: 40,
    duration: 112,
  },

  {
    title: "武言圣 - 失散的城市",
    url: "https://qn.lvmaoya.cn/music/%E6%AD%A6%E8%A8%80%E5%9C%A3%20-%20%E5%A4%B1%E6%95%A3%E7%9A%84%E5%9F%8E%E5%B8%82.ogg",
    id: 41,
    duration: 213,
  },

  {
    title: "猫仙人 - Pop & Vibe Type Beat “Feeling”",
    url: "https://qn.lvmaoya.cn/music/%E7%8C%AB%E4%BB%99%E4%BA%BA%20-%20Pop%20%26%20Vibe%20Type%20Beat%20%E2%80%9CFeeling%E2%80%9D.ogg",
    id: 42,
    duration: 160,
  },

  {
    title: "羽肿 - 花火が瞬く夜に",
    url: "https://qn.lvmaoya.cn/music/%E7%BE%BD%E8%82%BF%20-%20%E8%8A%B1%E7%81%AB%E3%81%8C%E7%9E%AC%E3%81%8F%E5%A4%9C%E3%81%AB.ogg",
    id: 43,
    duration: 271,
  },

  {
    title: "蓝莓酱 - 所爱隔山海",
    url: "https://qn.lvmaoya.cn/music/%E8%93%9D%E8%8E%93%E9%85%B1%20-%20%E6%89%80%E7%88%B1%E9%9A%94%E5%B1%B1%E6%B5%B7.ogg",
    id: 44,
    duration: 115,
  },

  {
    title: "蓝莓酱 - 星河不可及",
    url: "https://qn.lvmaoya.cn/music/%E8%93%9D%E8%8E%93%E9%85%B1%20-%20%E6%98%9F%E6%B2%B3%E4%B8%8D%E5%8F%AF%E5%8F%8A.ogg",
    id: 45,
    duration: 225,
  },

  {
    title: "贺柳（Annie Hall） - 再见九月Farewell，my september (纯音乐)",
    url: "https://qn.lvmaoya.cn/music/%E8%B4%BA%E6%9F%B3%EF%BC%88Annie%20Hall%EF%BC%89%20-%20%E5%86%8D%E8%A7%81%E4%B9%9D%E6%9C%88Farewell%EF%BC%8Cmy%20september%20%28%E7%BA%AF%E9%9F%B3%E4%B9%90%29.ogg",
    id: 46,
    duration: 361,
  },

  {
    title: "轻松音乐 - 月光下的云海 (钢琴曲版)",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%9F%B3%E4%B9%90%20-%20%E6%9C%88%E5%85%89%E4%B8%8B%E7%9A%84%E4%BA%91%E6%B5%B7%20%28%E9%92%A2%E7%90%B4%E6%9B%B2%E7%89%88%29.ogg",
    id: 47,
    duration: 107,
  },

  {
    title: "轻松频率 - 图书馆",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E5%9B%BE%E4%B9%A6%E9%A6%86.ogg",
    id: 48,
    duration: 142,
  },

  {
    title: "轻松频率 - 在路上",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E5%9C%A8%E8%B7%AF%E4%B8%8A.ogg",
    id: 49,
    duration: 233,
  },

  {
    title: "轻松频率 - 山川谷隐",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E5%B1%B1%E5%B7%9D%E8%B0%B7%E9%9A%90.ogg",
    id: 50,
    duration: 206,
  },

  {
    title: "轻松频率 - 旅程",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%97%85%E7%A8%8B.ogg",
    id: 51,
    duration: 190,
  },

  {
    title: "轻松频率 - 时光",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%97%B6%E5%85%89.ogg",
    id: 52,
    duration: 213,
  },

  {
    title: "轻松频率 - 朦胧清晨",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%9C%A6%E8%83%A7%E6%B8%85%E6%99%A8.ogg",
    id: 53,
    duration: 233,
  },

  {
    title: "轻松频率 - 沧海",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E6%B2%A7%E6%B5%B7.ogg",
    id: 54,
    duration: 190,
  },

  {
    title: "轻松频率 - 灯塔水母：时空守护者",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E7%81%AF%E5%A1%94%E6%B0%B4%E6%AF%8D%EF%BC%9A%E6%97%B6%E7%A9%BA%E5%AE%88%E6%8A%A4%E8%80%85.ogg",
    id: 55,
    duration: 159,
  },

  {
    title: "轻松频率 - 记忆",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E8%AE%B0%E5%BF%86.ogg",
    id: 56,
    duration: 187,
  },

  {
    title: "轻松频率 - 闪烁",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E9%97%AA%E7%83%81.ogg",
    id: 57,
    duration: 144,
  },

  {
    title: "轻松频率 - 雨后暖阳",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E9%9B%A8%E5%90%8E%E6%9A%96%E9%98%B3.ogg",
    id: 58,
    duration: 215,
  },

  {
    title: "轻松频率 - 风雪起舞",
    url: "https://qn.lvmaoya.cn/music/%E8%BD%BB%E6%9D%BE%E9%A2%91%E7%8E%87%20-%20%E9%A3%8E%E9%9B%AA%E8%B5%B7%E8%88%9E.ogg",
    id: 59,
    duration: 147,
  },

  {
    title: "青睐 - 夏の景色",
    url: "https://qn.lvmaoya.cn/music/%E9%9D%92%E7%9D%90%20-%20%E5%A4%8F%E3%81%AE%E6%99%AF%E8%89%B2.ogg",
    id: 60,
    duration: 233,
  },

  {
    title: "颜轻柔 - 携温柔坠落",
    url: "https://qn.lvmaoya.cn/music/%E9%A2%9C%E8%BD%BB%E6%9F%94%20-%20%E6%90%BA%E6%B8%A9%E6%9F%94%E5%9D%A0%E8%90%BD.ogg",
    id: 61,
    duration: 141,
  },

  {
    title: "马永康YoungKha - 极光磁场Aurora",
    url: "https://qn.lvmaoya.cn/music/%E9%A9%AC%E6%B0%B8%E5%BA%B7YoungKha%20-%20%E6%9E%81%E5%85%89%E7%A3%81%E5%9C%BAAurora.ogg",
    id: 62,
    duration: 224,
  },

  {
    title: "高学深 - Transience 稍纵即逝",
    url: "https://qn.lvmaoya.cn/music/%E9%AB%98%E5%AD%A6%E6%B7%B1%20-%20Transience%20%E7%A8%8D%E7%BA%B5%E5%8D%B3%E9%80%9D.ogg",
    id: 63,
    duration: 482,
  },

  {
    title: "鹭起Herons - Lost Romance",
    url: "https://qn.lvmaoya.cn/music/%E9%B9%AD%E8%B5%B7Herons%20-%20Lost%20Romance.ogg",
    id: 64,
    duration: 164,
  },

  {
    title: "鹭起Herons - Prelude(序)",
    url: "https://qn.lvmaoya.cn/music/%E9%B9%AD%E8%B5%B7Herons%20-%20Prelude%28%E5%BA%8F%29.ogg",
    id: 65,
    duration: 112,
  },
];

const currentIndex = ref(Math.floor(Math.random() * 51));
const currentMusic = ref<{ duration: number; url: string; title: string }>({
  duration: 0,
  url: "",
  title: "",
});
watch(currentIndex, () => {
  initMusic();
});
const initMusic = () => {
  currentMusic.value = musicList[currentIndex.value];
  totalTime.value = currentMusic.value.duration;
};
initMusic();
// const hotMenuRes = await getHotMenu()
// if (hotMenuRes.code == 200) {
//   musicMenu.value = hotMenuRes.data
//   currentMusic.value = musicMenu.value[currentIndex.value]
//   totalTime.value = currentMusic.value.duration
// }

const isStoped = ref(true);
const handlePauseClick = () => {
  isStoped.value = !isStoped.value;
  if (isStoped.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
};
const handleNextClick = async () => {
  isStoped.value = false;
  currentIndex.value == musicList.length - 1
    ? (currentIndex.value = 0)
    : (currentIndex.value += 1);
  initMusic();
  await audio.value.load();
  audio.value.play();
};
const handlelastClick = async () => {
  isStoped.value = false;
  currentIndex.value == 0
    ? (currentIndex.value = musicList.length - 1)
    : (currentIndex.value -= 1);
  initMusic();
  await audio.value.load();
  audio.value.play();
};

watch([currentTime, totalTime], (newVal, val) => {
  let progress = (newVal[0] * 100) / totalTime.value;
  //@ts-ignore
  document.querySelector(
    ".currentTime"
  ).style.transform = `translateX(${progress}%)`;
});
const isPlaying = ref();
// const isLoaded = ref(false)
const audioTimeUpdate = () => {
  if (audio.value != null) {
    currentTime.value = audio.value.currentTime;
  }
};
const musicPause = () => {
  isPlaying.value = false;
};
const musicEnded = () => {
  handleNextClick();
};
const canplay = (val: any) => {
  // console.log(val)
  // isLoaded.value = true
};
const musicErr = () => {
  // console.log("musicErr")
};
const musicPlaying = () => {
  // console.log("musicplaying")
};
const convertSecondsToMmSs = (seconds: any) => {
  let minutes;
  // 如果秒数大于 60，将其转换为分钟和秒
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
  } else {
    minutes = 0;
  }

  // 将分钟和秒格式化为两位数
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // 返回格式化的字符串
  return minutes + ":" + seconds;
};
const formatSeconds = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
};
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
    grid-template-columns: repeat(3, 1fr);
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
            // background-position: top left;
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

    .musicBox {
      display: flex;
      justify-content: flex-end;
      @media (max-width: 768px) {
        & {
          display: none;
        }
      }

      .musicContent {
        .musicTitle {
          font-size: var(--text-small-font-size);
          color: var(--third-text-color);
          padding-bottom: 17px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .control {
          display: flex;
          padding: 0;

          li {
            margin: 0 20px 0 0;
            list-style: none;

            a {
              background-repeat: no-repeat;
              background-size: cover;
              display: block;
              opacity: 0.8;
              text-indent: -9999px;
              transition: opacity 0.2s linear, transform 0.2s, background, 0.2s;
              width: 18px;
              height: 18px;

              &:hover {
                opacity: 1;
              }

              &:active {
                transform: scale(0.8);
              }
            }

            &:nth-child(1) a {
              background-image: url(../assets/img/last.svg);
            }

            &:nth-child(2) a {
              background-image: url(../assets/img/start.svg);
            }

            &:nth-child(3) a {
              background-image: url(../assets/img/next.svg);
            }
          }

          .stop a {
            background-image: url(../assets/img/stop.svg) !important;
          }
        }
      }

      .progress {
        display: flex;
        align-items: center;
        height: 25px;

        .line {
          width: 300px;
          height: 2px;
          display: block;
          background: #808080;
          @media (max-width: 2024px) {
            & {
              width: 240px;
            }
          }

          i {
            display: block;
            height: 16px;
            width: 100%;
            position: relative;
            left: -2px;
            top: -7px;
            background-color: transparent;
            border-left: 2px solid red;
            transform: translateX(0%);
          }
        }

        .time {
          padding-left: 20px;
          display: block;
          white-space: nowrap;
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

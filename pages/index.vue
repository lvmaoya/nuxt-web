<template>
  <div class="home">
    <div class="home-title">
      Welcome to Sun's blog!
    </div>
    <div class="home-sub-title">I'am a frontEnd developer</div>
  </div>
  <HomeMain :thingList="(thingList as Array<BlogType>)"></HomeMain>
</template>

<script lang="ts" setup>
import { type BlogType } from "@/composables/index";
const thingList = ref<Array<BlogType>>();
const emits = defineEmits(['contentChange'])

thingList.value = (await getBlogList({ fatherCategoryId: 1, size: 999 })).data.records;

useHead({
  title: "Lvmaoya",
  meta: [
    { name: "google-site-verification", content: "rdicKFHUWZtMhhwgAXfrjwCJSXuzRzH6UcmV1gUgj_o" }
  ],
});
onBeforeMount(() => {
  emits('contentChange')
})
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 21;
  text-align: center;
  padding-top: 38vh;
  box-sizing: border-box;
  background-color: #fff;

  .home-title {
    font-size: 2em;
    font-family: Georgia, "Helvetica Neue", Times, serif;
    user-select: none;
  }

  .home-sub-title {
    font-family: Georgia, "Helvetica Neue", Times, serif;
    font-style: italic;
    font-size: 1.3em;
    padding: 15px;
    user-select: none;
  }
}
</style>

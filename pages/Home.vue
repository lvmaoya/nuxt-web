<template>
  <HomeBody></HomeBody>
  <HomeMain :thingList="(thingList as Array<BlogType>)"></HomeMain>
</template>

<script lang="ts" setup>
import { type BlogType } from "@/composables/index";
const thingList = ref<Array<BlogType>>();
const emits = defineEmits(['contentChange'])

thingList.value = (await getBlogList()).data.records;

useHead({
  title: "lvmaoya",
  meta: [
    { name: "google-site-verification", content: "rdicKFHUWZtMhhwgAXfrjwCJSXuzRzH6UcmV1gUgj_o" },
  ],
});
onBeforeMount(() => {
  emits('contentChange')
})
</script>

<style scoped lang="scss"></style>

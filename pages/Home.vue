<template>
  <HomeBody></HomeBody>
  <HomeMain :thingList="(thingList as Array<ThingType>)"></HomeMain>
</template>

<script lang="ts" setup>
import { type ThingType } from "@/composables/index";
const thingList = ref<Array<ThingType>>();
const emits = defineEmits(['contentChange'])
thingList.value = (await getIntersetThingList()).data.records;

useHead({
  meta: [
    { name: "google-site-verification", content: "rdicKFHUWZtMhhwgAXfrjwCJSXuzRzH6UcmV1gUgj_o" },
  ],
});
onBeforeMount(() => {
  emits('contentChange')
})
</script>

<style scoped lang="scss"></style>

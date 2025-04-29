<template>
  <div class="workActicleContent">
    <WorkItem v-for="(item, index) in props.list" :key="item.article_id" :item="item" :index="index"></WorkItem>
    <CategoryList></CategoryList>
  </div>
</template>

<script setup lang="ts">
import { type BlogType } from "~~/composables";

const props = defineProps({
  list: {
    required: false,
    type: Array<BlogType>,
  },
});

</script>

<style scoped lang="scss">
.workActicleContent {
  min-height: 50vh;
}
</style>

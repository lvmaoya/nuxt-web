<template>
  <div class="content">
    <WorkItem v-for="(item, index) in props.list" :key="item.id" :item="item" :index="index"></WorkItem>
    <NoData v-if="props.list?.length === 0" :loading="props.loading"></NoData>
  </div>
</template>

<script setup lang="ts">
import { type BlogType } from "~~/composables";

const props = defineProps({
  list: {
    required: false,
    type: Array<BlogType>,
  },
  loading: {
    required: false,
    type: Boolean,
  }
});

</script>

<style scoped lang="scss">
.content {
  min-height: 50vh;
}
</style>

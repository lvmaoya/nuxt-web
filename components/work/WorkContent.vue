<template>
  <ul class="content">
    <li v-for="(item, index) in props.list" :key="item.id">
      <a class="title" :href="'/detail/' + item.id">
        {{ item.title }}
      </a>
    </li>
    <NoData v-if="props.list?.length === 0" :loading="props.loading"></NoData>
  </ul>
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
  },
});
</script>

<style scoped lang="scss">
ul.content {
  min-height: 50vh;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-column-gap: 40px;
  list-style-position: inside;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  li {
    padding: 8px 0;
    cursor: pointer;
    max-lines: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .title {
      color: var(--primary-title-color);
      font-size: var(--text-font-size);
      border-bottom: 1px solid #fff;
      transition: all 0.2s;
    }
    &:hover .title {
      border-bottom: 1px solid var(--primary-title-color);
    }
  }
}
</style>

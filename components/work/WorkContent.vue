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
  }
});

const convertDateToAbbreviatedMonthYear = (dateStr: string) => {
  const date = new Date(dateStr);
  const monthAbbreviations = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const monthAbbreviation = monthAbbreviations[monthIndex];
  const day = date.getDate();
  return `${day} ${monthAbbreviation}, ${year}`;
}

</script>

<style scoped lang="scss">
.content {
  min-height: 50vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 40px;
}

li {
  padding: 8px 0;
  cursor: pointer;

  &:hover .title {
    border-bottom: 1px solid var(--primary-title-color);
  }
}

.title {
  color: var(--primary-title-color);
  max-lines: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid #fff;
  transition: all 0.2s;
  width: fit-content;
}
</style>

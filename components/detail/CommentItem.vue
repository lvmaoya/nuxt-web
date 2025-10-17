<template>
  <div class="comment-li">
    <div class="user-avatar" v-html="multiavatar(item.avatar)"></div>
    <div class="comment-info">
      <div class="comment-info-top">
        <div class="name-container">
          <div class="username">{{ item.username }}</div>
          <div class="reply-text" v-if="item.type == 1">reply</div>
          <div class="username" v-if="item.type == 1">
            {{ item.toCommentUser }}
          </div>
        </div>
        <div class="date">
          {{ item.createdTime.replace(/:[^:]*$/, "") }}
        </div>
      </div>
      <div class="comment-info-bottom">{{ item.content }}</div>
    </div>
    <div
      class="response-box"
      @click="handleResponseSBClick(item.id, item.username)"
    >
      Reply
    </div>
  </div>
</template>

<script setup lang="ts">
import { multiavatar } from "~~/public/avatar";
import { type CommentType } from "~~/composables";

const props = defineProps({
  item: {
    required: true,
    type: Object as () => CommentType,
  },
});
const emit = defineEmits(["responseSBClick"]);

const handleResponseSBClick = (id: number, username: string) => {
  emit("responseSBClick", id, username);
};
</script>
<style scoped lang="scss">
.comment-li {
  display: flex;
  width: 100%;

  .user-avatar {
    padding-top: 16px;

    :deep(svg) {
      width: 30px;
      height: 30px;
    }
  }

  .comment-info {
    padding-top: 16px;
    padding-bottom: 16px;
    width: 100%;
    margin-left: 8px;

    .comment-info-top {
      display: flex;
      margin-bottom: 4px;
      line-height: 20px;
      font-size: 14px;

      .name-container {
        display: flex;
        color: var(--third-text-color);
        font-size: var(--text-small-font-size);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .username {
          max-width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .reply-text {
          display: block;
          margin: 0 8px;
          font-style: italic;
          font-size: 10px;
          color: #eb5055;
        }
      }

      .date {
        margin-left: 8px;
        font-style: italic;
        color: var(--third-text-color);
        font-size: var(--text-small-font-size);
      }
    }

    .comment-info-bottom {
      font-size: 14px;
      color: #222226;
      line-height: 22px;
      word-break: break-word;
    }
  }

  .response-box {
    opacity: 0;
    cursor: pointer;
    margin-top: auto;
    margin-bottom: 16px;
    padding: 6px 12px;
    font-size: var(--text-small-font-size);
  }

  &:hover .response-box {
    opacity: 1;
  }
}
</style>

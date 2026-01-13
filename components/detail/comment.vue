<template>
  <div class="comment-container">
    <div class="user-input">
      <div class="user-info">
        <ul>
          <li>
            <input
              type="text"
              placeholder="Name"
              v-model="username"
              maxlength="12"
              ref="userNameRef"
            />
          </li>
          <li>
            <input
              type="text"
              placeholder="Email"
              v-model="email"
              ref="emailRef"
            />
          </li>
          <li><input type="text" placeholder="Site" v-model="site" /></li>
        </ul>
      </div>
      <div class="user-comment">
        <textarea
          name="commentTextarea"
          v-model="textareaText"
          ref="textareaRef"
          id="comment-textarea"
          placeholder="Welcome your comment!"
          maxlength="1000"
        ></textarea>
        <button class="comment-operate" @click="handleCommentClick">
          Submit
        </button>
      </div>
    </div>
    <div class="comment-content" v-if="commentList.length > 0">
      <ul>
        <li v-for="item in commentList" :key="item.id">
          <CommentItem :item="item" @responseSBClick="responseSBClick" />
          <div
            class="reply-comments"
            v-if="item.children && item.children.length > 0"
          >
            <CommentItem
              v-for="reply in item.children"
              :key="reply.id"
              :item="reply"
              @responseSBClick="responseSBClick"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CommentType } from "~~/composables";
import { multiavatar } from "~~/public/avatar";
import CommentItem from "./CommentItem.vue";
const props = defineProps({
  articleId: {
    required: true,
    type: Number,
  },
});
const emits = defineEmits(["commentNum"]);
// 获取评论的数量和内容
const commentList = ref<Array<CommentType>>([]);
const commentNum = ref(0);
const getComment = async () => {
  const pingLunData = await getCommentList({ articleId: props.articleId });
  let records = pingLunData.data.records;

  // 整理评论数据结构
  const commentMap = new Map();
  // 先找出所有根评论
  const rootComments = records.filter((item) => item.type === 0);

  // 将根评论放入 Map
  rootComments.forEach((root) => {
    commentMap.set(root.id, {
      ...root,
      children: [],
    });
  });

  // 处理回复评论
  const replyComments = records.filter((item) => item.type === 1);
  replyComments.forEach((reply) => {
    // 找到被回复的评论
    const toComment = records.find(
      (item) => item.id === Number(reply.toCommentId)
    );
    // 添加被回复用户的名称
    reply.toCommentUser = toComment ? toComment.username : "";

    const rootComment = commentMap.get(reply.rootCommentId);
    if (rootComment) {
      rootComment.children.push(reply);
    }
  });
  // 转换回数组形式
  commentList.value = Array.from(commentMap.values());

  commentNum.value = pingLunData.data.total || 0;
  emits("commentNum", commentNum.value);
};
getComment();
// 生成头像
let avatar: any;
let avatarValue: number;
const makeAvatar = () => {
  // 获取时间戳加上一个0到100万的随机数
  let timeStamp = new Date().getTime();
  let random = Math.floor(Math.random() * 1000000);
  avatarValue = timeStamp + random;
  if (cache.getCache("avatar")) {
    avatarValue = cache.getCache("avatar");
  }
  // 生成一个svg头像，传入的数值相等生成的头像一样
  avatar = multiavatar(avatarValue);
};
// 评论
let textareaText = ref("");
let textareaRef = ref();
const username = ref();
const userNameRef = ref();
const toUsername = ref();
const toCommentId = ref();
const email = ref();
const emailRef = ref();
const site = ref();
// 获取用户头像姓名邮箱网址
if (process.client) {
  makeAvatar();
  username.value = cache.getCache("un") || "";
  email.value = cache.getCache("em") || "";
  site.value = cache.getCache("st") || "";
}
onMounted(() => {
  if (username.value && email.value) {
    userNameRef.value.disabled = true;
    emailRef.value.disabled = true;
  }
});
const handleCommentClick = async () => {
  // 检测为空不，检测是否有用户名
  if (
    textareaText.value === "" ||
    textareaText.value.replace(/\s*/g, "") === ""
  ) {
    textareaText.value = "";
    textareaRef.value.focus();
    return;
  }

  if (username.value === "") {
    userNameRef.value.focus();
    return;
  }
  if (email.value === "") {
    emailRef.value.focus();
    return;
  }

  // 判断是否在回复别人
  if (textareaText.value.includes(`@` + toUsername.value + "：")) {
    textareaText.value = textareaText.value.replace(
      `@` + toUsername.value + "：",
      ""
    );
    // 回复空判
    if (
      textareaText.value === "" ||
      textareaText.value.replace(/\s*/g, "") === ""
    ) {
      textareaText.value = `@` + toUsername.value + "：";
      textareaRef.value.focus();
      return;
    }
  } else {
    toCommentId.value = undefined;
    toUsername.value = "";
  }
  // 评论人：最长十个字,头像：一串数字，时间，to_id
  let comment = {
    articleId: props.articleId,
    type: 1,
    avatar: avatarValue,
    content: textareaText.value,
    rootCommentId: 0, // 回复的评论id，如果是根评论则为null，如果是子评论则为父评论的id
    toCommentId: toCommentId.value || undefined,

    username: username.value,
    email: email.value,
    site: site.value,
  };

  if (!toCommentId.value) {
    comment.type = 0;
  } else {
    let item = commentList.value.find((item) => item.id === toCommentId.value);
    if (item) {
      comment.rootCommentId = item.rootCommentId || item.id;
    }
  }
  await commitComment(comment);
  // 重新获取评论
  getComment();
  textareaText.value = "";
  cache.setCache("avatar", avatarValue);
  cache.setCache("un", username.value);
  cache.setCache("em", email.value);
  cache.setCache("st", site.value);
  userNameRef.value.disabled = true;
  emailRef.value.disabled = true;
};
const responseSBClick = (id: number, name: string) => {
  textareaText.value = "@" + name + "：";
  textareaRef.value.focus();
  toCommentId.value = id;
  toUsername.value = name;
};
</script>
<style scoped lang="scss">
.comment-container {
  width: 100%;
  max-width: 960px;
  color: var(--primary-text-color);
  font-size: var(--text-font-size);
  position: relative;
  z-index: 21;
  margin: 0 auto;
  margin-bottom: 80px;
  li {
    list-style: none;
  }

  .user-input {
    width: 100%;
    border: 1px solid var(--primary-border-color);
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    padding: 4px 12px;

    .user-info {
      width: 100%;

      ul {
        width: 100%;
        display: flex;
        border-bottom: 1px dashed var(--primary-border-color);
        flex-wrap: wrap;

        li {
          width: 33.3333%;
          min-width: 200px;

          input {
            display: block;
            width: 100%;
            height: 34px;
            color: var(--primary-text-color);
            outline: 0;
            border: 0;
            background: #fff;
            &::placeholder {
              color: var(--third-text-color);
            }
          }
        }
      }
    }

    .user-comment {
      #comment-textarea {
        display: block;
        width: 100%;
        height: 100px;
        margin-top: 10px;
        border: none;
        resize: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: none;

        /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
        // 滚动条整体部分
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
        &::-webkit-scrollbar-button {
          display: none;
        }

        // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
        &::-webkit-scrollbar-thumb {
          background: rgba(80, 79, 79, 0.3);
          cursor: pointer;
          border-radius: 4px;
        }

        // 边角，即两个滚动条的交汇处
        &::-webkit-scrollbar-corner {
          display: none;
        }

        // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
        &::-webkit-resizer {
          display: none;
        }
        &::placeholder {
          color: var(--third-text-color);
        }
      }
      button.comment-operate {
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--primary-text-color);
        color: #fff;
        border-radius: 16px;
        font-size: var(--text-small-font-size);
        cursor: pointer;
        border: none;
        padding: 6px 12px;
        margin-left: auto;
        margin-bottom: 12px;
        transition: all 0.2s;
        &:active {
          transform: scale(0.9);
        }
      }
    }
  }

  .comment-content {
    background-color: #fff;
    padding: 4px 12px;
    border-radius: 8px;
    border: 1px solid var(--primary-border-color);
    margin-top: 20px;
    ul > li {
      list-style: none;
    }
    .reply-comments {
      padding-left: 20px;
    }
  }
}
</style>

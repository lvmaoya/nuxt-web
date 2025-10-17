<template>
  <div class="commentCom">
    <div class="userInput">
      <div class="userInfo">
        <ul>
          <li><input type="text" placeholder="Name" v-model="username" maxlength="12" ref="userNameRef"></li>
          <li><input type="text" placeholder="Email" v-model="email" ref="emailRef"></li>
          <li><input type="text" placeholder="Site" v-model="site"></li>
        </ul>
      </div>
      <div class="userComment">
        <textarea name="commentContent" v-model="textareaText" ref="textareaRef" id="commentContent"
          placeholder="Welcome your comment!" maxlength="1000"></textarea>
        <div class="comment-operate-r">
          <button class="btnComment" @click="handleCommentClick">Submit</button>
        </div>
      </div>
    </div>
    <div class="commentContent">
      <div class="commentListBox">
        <ul>
          <li class="commentLi" v-for="item in commentList" :key="item.id">
            <div class="commentListItem">
              <div class="userImg" v-html="multiavatar(item.avatar)"></div>
              <div class="right-box">
                <div class="new-info-box">
                  <div class="comment-top">
                    <div class="user-box">
                      <div class="name">
                        <div class="commentName">{{ item.username }}</div>
                        <div v-if="item.type == 1" class="anwserName">
                          <span class="answerText">reply</span>
                          <span class="anwserNameContent">
                            {{ item.toCommentId }}
                          </span>
                        </div>
                      </div>
                      <div class="date">
                        {{ item.createdTime.replace(/:[^:]*$/, '') }}
                      </div>
                    </div>

                  </div>
                  <div class="comment-center">
                    <div class="new-comment">{{ item.content }}</div>
                  </div>
                </div>
              </div>
              <div class="response-box" @click="handleResponseSBClick(item.id, item.username)">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiazai16"></use>
                </svg>
              </div>
            </div>
            <div class="reply-comments" v-if="item.children && item.children.length > 0">
              <div class="commentListItem" v-for="reply in item.children" :key="reply.id">
                <div class="userImg" v-html="multiavatar(reply.avatar)"></div>
                <div class="right-box">
                  <div class="new-info-box">
                    <div class="comment-top">
                      <div class="user-box">
                        <div class="name">
                          <div class="commentName">{{ reply.username }}</div>
                          <div v-if="reply.type == 1" class="anwserName">
                            <span class="answerText">reply</span>
                            <span class="anwserNameContent">
                              {{ reply.toCommentUser }}
                            </span>
                          </div>
                        </div>
                        <div class="date">
                          {{ reply.createdTime.replace(/:[^:]*$/, '') }}
                        </div>
                      </div>

                    </div>
                    <div class="comment-center">
                      <div class="new-comment">{{ reply.content }}</div>
                    </div>
                  </div>
                </div>
                <div class="response-box" @click="handleResponseSBClick(reply.id, reply.username)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai16"></use>
                  </svg>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="commentLookMore"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CommentType } from "~~/composables";
import { multiavatar } from "~~/public/avatar";
const props = defineProps({
  articleId: {
    required: true,
    type: Number,
  },
});
const emits = defineEmits(['commentNum'])
// 获取评论的数量和内容
const commentList = ref<Array<CommentType>>([]);
const commentNum = ref(0);
const getComment = async () => {
  const pingLunData = await getCommentList({ articleId: props.articleId });
  let records = pingLunData.data.records;

  // 整理评论数据结构
  const commentMap = new Map();
  // 先找出所有根评论
  const rootComments = records.filter(item => item.type === 0);

  // 将根评论放入 Map
  rootComments.forEach(root => {
    commentMap.set(root.id, {
      ...root,
      children: []
    });
  });

  // 处理回复评论
  const replyComments = records.filter(item => item.type === 1);
  replyComments.forEach(reply => {
    // 找到被回复的评论
    const toComment = records.find(item => item.id === Number(reply.toCommentId));
    // 添加被回复用户的名称
    reply.toCommentUser = toComment ? toComment.username : '';
    
    const rootComment = commentMap.get(reply.rootCommentId);
    if (rootComment) {
      rootComment.children.push(reply);
    }
  });
  // 转换回数组形式
  commentList.value = Array.from(commentMap.values());

  commentNum.value = pingLunData.data.total || 0;
  emits('commentNum', commentNum.value)
};
getComment()
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
}
// 评论
let textareaText = ref("");
let textareaRef = ref()
const username = ref()
const userNameRef = ref()
const toUsername = ref();
const toCommentId = ref();
const email = ref()
const emailRef = ref()
const site = ref()
// 获取用户头像姓名邮箱网址
if (process.client) {
  makeAvatar()
  username.value = cache.getCache("un") || "";
  email.value = cache.getCache('em') || ""
  site.value = cache.getCache('st') || ""
}
onMounted(() => {
  if (username.value && email.value) {
    userNameRef.value.disabled = true
    emailRef.value.disabled = true
  }

})
const handleCommentClick = async () => {
  // 检测为空不，检测是否有用户名
  if (textareaText.value === "" || textareaText.value.replace(/\s*/g, "") === "") {
    textareaText.value = "";
    textareaRef.value.focus();
    return;
  }

  if (username.value === "") {
    userNameRef.value.focus()
    return;
  }
  if (email.value === '') {
    emailRef.value.focus()
    return;
  }

  // 判断是否在回复别人
  if (textareaText.value.includes(`@` + toUsername.value + "：")) {
    textareaText.value = textareaText.value.replace(`@` + toUsername.value + "：", "");
    // 回复空判
    if (textareaText.value === "" || textareaText.value.replace(/\s*/g, "") === "") {
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
    site: site.value
  };

  if (!toCommentId.value) {
    comment.type = 0;
  } else {
    let item = commentList.value.find((item) => item.id === toCommentId.value)
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
  userNameRef.value.disabled = true
  emailRef.value.disabled = true
};
const handleResponseSBClick = (id: number, name: string) => {
  textareaText.value = "@" + name + "：";
  textareaRef.value.focus();
  toCommentId.value = id;
  toUsername.value = name;
};
</script>
<style scoped lang="scss">
.commentCom {
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  color: var(--primary-text-color);
  margin-bottom: 250px;

  li {
    list-style: none;
  }

  .userInput {
    width: 100%;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
    box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    border-radius: 3px;
    padding: 0 12px;

    .userInfo {
      width: 100%;

      ul {
        width: 100%;
        display: flex;
        border-bottom: 1px dashed #dbdbdb;
        flex-wrap: wrap;

        li {
          width: 33.3333%;
          min-width: 200px;

          input {
            font-size: 13px;
            display: block;
            width: 100%;
            height: 34px;
            color: #313131;
            outline: 0;
            border: 0;
            background: #fff;
          }
        }
      }
    }

    .userComment {

      #commentContent {
        display: block;
        width: 100%;
        margin-top: 10px;
        border: none;
        border-radius: 4px;
        resize: none;
        height: 100px;
        font-size: 13px;
        line-height: 22px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
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
      }

      .comment-operate-r {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 10px 16px 10px 0px;
        box-sizing: border-box;

        .btnComment {
          display: flex;
          width: 60px;
          height: fit-content;
          background: #6e8efb;
          color: white;
          border-radius: 16px;
          font-size: 12px;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border: none;
          position: relative;
          padding: 4px 8px;
          transition: all 0.2s ease-in-out;

          &:hover {
            background: #5a7ceb;
          }

          &:active {
            transform: scale(0.9);
          }
        }
      }
    }
  }

  .commentContent {
    padding-top: 12px;
    padding-bottom: 30px;

    .commentListBox {
      background-color: #fff;
      padding: 0 12px;
      border-radius: 3px;
      -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
      box-shadow: 0 1px 4px rgba(0, 0, 0, .04);

      ul>li {
        list-style: none;
      }

      .commentListItem {
        display: flex;
        width: 100%;

        .userImg {
          padding-top: 16px;

          :deep(svg) {
            width: 30px;
            height: 30px;
          }
        }

        .right-box {
          padding-top: 16px;
          padding-bottom: 16px;
          width: 100%;
          margin-left: 8px;

          .comment-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
            line-height: 20px;
            font-size: 14px;

            .user-box {
              display: flex;

              .name {
                display: flex;
                color: #777888;
                margin-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                .commentName {
                  max-width: 70px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .anwserName {
                  margin-left: 7px;
                  display: flex;

                  .answerText {
                    display: block;
                    margin-right: 7px;
                    font-style: italic;
                    font-size: 10px;
                    color: #eb5055;
                  }

                  .anwserNameContent {
                    display: block;
                    max-width: 65px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }

              .date {
                margin-left: 5px;
                font-style: italic;
                font-size: 12px;
                color: #777888;
              }
            }


          }

          .comment-center {
            .new-comment {
              font-size: 14px;
              color: #222226;
              line-height: 22px;
              word-break: break-word;
            }
          }
        }

        .response-box {
          opacity: 0;
          transition: opacity 0.2s;
          cursor: pointer;
          margin-top: auto;
          margin-bottom: 16px;


          .icon {
            transform: rotateY(180deg);
            width: 15px;
            height: 15px
          }
        }

        &:hover .response-box {
          opacity: 1;
          ;
        }
      }
      .reply-comments{
        padding-left: 20px;
      }
    }

  }
}
</style>


import Http from "@/http/index";

export interface ResponseConfig<T> {
  code: number;
  message: string;
  data: T;
}
export interface ResponseListType<T> {
  total: number;
  size: number;
  current: number;
  pages: number;
  records: Array<T>;
}

// 用户信息
export interface UserInfoType {
  id: number;
  name: string | null;
  nickName: string;
  email: string;
  mobile: string;
  otherContact: string;
  introduce: string;
  avatar: string;
  createdAt: string | null; // 或使用 Date | null
  updatedAt: string | null; // 或使用 Date | null
}

export interface CategoryType {
  id: number;
  categoryName: string;
  fatherCategoryId: number;
  deleted: number;
  createdTime: string; // 或使用 Date 类型
  updatedTime: string; // 或使用 Date 类型
  count?: number;
}
export interface BlogType {
  id: number;
  title: string;
  description: string;
  keywords: string;
  articleAbstract: string | null;
  category: CategoryType | null;
  categoryId: number | null;
  fatherCategoryId: number | null;
  coverImage: string;
  content: string;
  charCount: number;
  pageView: number;
  preferNum: number;
  status: number;
  authorId: number;
  top: number;
  deleted: number;
  publishedTime: string; // 或使用 Date 类型
  updatedTime: string;   // 或使用 Date 类型
}
export interface CommentType {
  id: number;
  articleId: number;
  articleTitle: string;
  rootCommentId: number | null;  // 根评论ID，可能为null
  type: number;                 // 评论类型
  toCommentId: number | null;   // 回复的评论ID，可能为null
  content: string;              // 评论内容
  status: number;               // 状态（0-正常，1-审核中等）
  deleted: number;              // 是否删除（0-未删除，1-已删除）
  username: string;             // 评论人用户名
  avatar: string;               // 头像（可能是URL或ID）
  email: string;                // 邮箱
  site: string;                 // 个人网站
  createdTime: string;          // 创建时间（ISO格式）
  updatedTime: string;          // 更新时间（ISO格式）
}
export interface BlogType {
  id: number;
  coverImage: string;
  description: string;
  title: string;
}

export const getBlogList = (params?: Object ) => {
  return Http.get<ResponseConfig<ResponseListType<BlogType>>>("/h5/blog/list", params);
};
export const getCategoryList = (params?: Object ) => {
  return Http.get<ResponseConfig<Array<CategoryType>>>("/h5/category/list", params);
};

export function getUserInfo() {
  return Http.get<ResponseConfig<UserInfoType>>("/h5/user");
}

export function getArticleDetail(id: number) {
  return Http.get<ResponseConfig<BlogType>>(`/h5/blog/${id}`);
}

export function changePVData(config: Object) {
  return Http.post<ResponseConfig<object>>("/h5/changePVData", config);
}

export function getCommentList(data: Object) {
  return Http.get<ResponseConfig<ResponseListType<CommentType>>>("/h5/comment/list", data);
}

export function commitComment(data: Object) {
  return Http.post<ResponseConfig<object>>("/h5/comment", data);
}
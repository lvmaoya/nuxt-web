
import Http from "@/http/index";
interface ResponseConfig<T> {
  code: number;
  message: string;
  data: T;
}
interface ResponseListType<T> {
  total: number;
  size: number;
  current: number;
  pages: number;
  records: Array<T>;
}
// 首页数据
export interface ThingType {
  id: number;
  coverImage: string;
  description: string;
  title: string;
}
export const getIntersetThingList = () => {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list",{ page: 1, size: 20});
};
export function getRecentUpdate() {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list",{ page: 1, size: 5});
}
// 技术文章页
export interface GetArticleListConfig {
  currentPage: number;
  size: number;
}
export interface ArticleItemResType {
  article_id: number;
  category_id: number;
  coverImage: string;
  description: string;
  title: string;
  pageview: number;
  prefer_num: number;
  publishedTime: string;
  category_name: string;
}
export interface ArticleListResType {
  total: number;
  records: Array<ArticleItemResType>;
  current: number;
}
export function getWorkArticleList(data: object) {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list",data);
}

// // 如果以后随笔文章想要分类功能可以传入参数essay
// export function getArticleCategoryList(config) {
//   return Http.get({ url: "/getArticleCategory?category=" + config });
// }
// export function searchArticle(config) {
//   return Http.post(config, { url: "/searchArticle" });
// }

// export function getRecentArticleList(config) {
//   return Http.post(config, { url: "/getRecentArticle" });
// }

// export function getHotArticleList(config) {
//   return Http.post(config, { url: "/getHotArticle" });
// }
// export function getArticleByCategoryData(config) {
//   return Http.post(config, { url: "/getArticleByCategory" });
// }

//随笔
export function getBlogArticleList(config: GetArticleListConfig) {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list",{ page: 1, size: 5});
}
// 用户信息
export interface userInfoType {
  introduce: string;
}
export function getUserInfo() {
  return Http.get<ResponseConfig<userInfoType>>("/h5/user");
}
// 详情页数据
export interface GetArticleConfigType {
  id: number;
}
export interface ArticleResType {
  article_id: number;
  content: string;
  title: string;
  publishedTime: string;
  pageview: number;
  description?: "";
}

export interface DianZanResType {
  dianZanNum: number;
  pageview: number;
}
export interface ChangePreferNumConfig {
  id: number;
  prefer_num: number;
}
export interface PinglunItemType {
  commentary_id: number;
  user_name: string;
  avatar: number;
  comment_type: number;
  to_name: number;
  created_time: string;
  content: string;
}
export interface PinglunResType<T> {
  total: number;
  list: Array<T>;
}
export function getArticleDetail(id: number) {
  return Http.get<ResponseConfig<ArticleResType>>(`/h5/blog/${id}`);
}
export function getDianZanNum(config: GetArticleConfigType) {
  return 0;
  // return Http.get<ResponseConfig<DianZanResType>>("/getDianZanNum", config);
}
export function changeABackPreferNum(config: ChangePreferNumConfig) {
  return Http.post<ResponseConfig<object>>("/h5/changeABackPreferNum", config);
}
export function changePVData(config: GetArticleConfigType) {
  return Http.post<ResponseConfig<object>>("/h5/changePVData", config);
}

export function getPingLun(data: GetArticleConfigType) {
  return Http.get<ResponseConfig<PinglunResType<PinglunItemType>>>("/h5/comment/list", data);
}

export interface CommentConfigType {
  articleId: number;
  to_id: number;
  to_name: string;
  userName: string;
  avatar: number;
  content: string;
  created_time: string;
  comment_type: number;
  email?:string;
  site?:string
}
export function commitComment(data: CommentConfigType) {
  return Http.post<ResponseConfig<object>>("/h5/comment", data);
}
export function getRecentArticleList(data: GetArticleListConfig) {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list", data);
}
export function getHotArticleList(data: GetArticleListConfig) {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list", data);
}
export interface CategoryItemType {
  category_id: number;
  category_name: string;
  count: number;
}
export interface CategoryDataType<T> {
  records: Array<T>;
}
export function getArticleCategoryList(id: number) {
  return Http.get<ResponseConfig<CategoryDataType<CategoryItemType>>>("/h5/category/list?fatherCategoryId=" + id,);
}

export function searchArticle(data: object) {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list", data);
}
export function searchBlog(data: object) {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list", data);
}
export interface searchConfigType {
  searchData: string;
  currentPage?: number;
  size?: number;
}
export function getArticleByCategoryData(data: object) {
  return Http.get<ResponseConfig<ResponseListType<ThingType>>>("/h5/blog/list", data);
}

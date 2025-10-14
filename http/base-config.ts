let baseURL: string;
if (process.env.NODE_ENV === "development") {
  baseURL = "https://api.lvmaoya.cn";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "https://api.lvmaoya.cn";
} else {
  baseURL = "https://sunjianxiang.cn:3000";
}
export default baseURL;
